export enum Godparent_Pronouns {
  NINONG = 1,
  NINANG = 2,
}

export const Godparent_Pronouns_Label: Record<Godparent_Pronouns, string> = {
  [Godparent_Pronouns.NINONG]: "Ninong",
  [Godparent_Pronouns.NINANG]: "Ninang",
};

export enum Gift_Types {
  MONETARY = 1,
  NON_MONETARY = 2,
}

export const Gift_Types_Label: Record<Gift_Types, string> = {
  [Gift_Types.MONETARY]: "Monetary",
  [Gift_Types.NON_MONETARY]: "Non-monetary",
};
