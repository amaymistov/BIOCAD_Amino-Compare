import {AMINO_ACID_REGEX} from "../constants/amino-acids.constants.ts";

export const validateAminoAcidSequence = (value: string) => {
  if (!AMINO_ACID_REGEX.test(value)) return 'Только аминокислоты (A,R,N,D,C,E,Q,G,H,I,L,K,M,F,P,S,T,W,Y,V) и символ "-"';
  return true;
};

export const validateSequenceLength = (
  value: string,
  compareWith: string
): string | true => {
  if (!compareWith || !value) return true;

  if (value.length !== compareWith.length) {
    return 'Длины последовательностей должны совпадать';
  }
  return true;
};