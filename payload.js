/**
 * Shared encode/decode for wallet URL hash payloads.
 * Format: v1.<base64url(JSON)>
 */
(function (root) {
  const VERSION = "v1";

  function toBase64Url(bytes) {
    let bin = "";
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  }

  function fromBase64Url(str) {
    const pad = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
    const b64 = str.replace(/-/g, "+").replace(/_/g, "/") + pad;
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  function utf8Encode(text) {
    return new TextEncoder().encode(text);
  }

  function utf8Decode(bytes) {
    return new TextDecoder().decode(bytes);
  }

  function encodePayload(data) {
    const json = JSON.stringify(data);
    return VERSION + "." + toBase64Url(utf8Encode(json));
  }

  function decodePayload(hash) {
    if (!hash) throw new Error("Missing ticket payload");
    const raw = hash.startsWith("#") ? hash.slice(1) : hash;
    const parts = raw.split(".");
    if (parts.length < 2 || parts[0] !== VERSION) {
      throw new Error("Unsupported or invalid ticket link");
    }
    const body = parts.slice(1).join(".");
    const json = utf8Decode(fromBase64Url(body));
    const data = JSON.parse(json);
    if (!data || !data.barcode) throw new Error("Ticket barcode missing from link");
    return data;
  }

  function buildWalletUrl(baseUrl, data) {
    const base = (baseUrl || "").replace(/\/+$/, "");
    return base + "/wallet.html#" + encodePayload(data);
  }

  root.DiceTicketTransfer = {
    VERSION,
    encodePayload,
    decodePayload,
    buildWalletUrl,
  };
})(typeof globalThis !== "undefined" ? globalThis : window);
