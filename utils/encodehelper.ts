import { Sha512 as shaEncryption } from "https://deno.land/std@0.144.0/hash/sha512.ts";

export const shaEncrypt = (text: string) => new shaEncryption().update(text).hex()