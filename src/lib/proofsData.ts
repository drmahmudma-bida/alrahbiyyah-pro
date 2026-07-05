// src/lib/proofsData.ts

export interface ProofText {
  arabic: string;
  translation: string;
  reference: string;
}

export interface MadhabProofs {
  shafii: ProofText;
  hanafi: ProofText;
  maliki: ProofText;
  hanbali: ProofText;
}

export interface ShareProof {
  ruleTitle: string;
  quran: ProofText;
  madhab: MadhabProofs;
}

// Your original texts, perfectly restructured for the computational engine
export const proofsDatabase: Record<string, Record<string, ShareProof>> = {
  
  // --- HUSBAND ---
  husband: {
    half_share: {
      ruleTitle: "Takes 1/2 due to absence of inheriting descendants.",
      quran: {
        reference: "Surah An-Nisa [4:12]",
        arabic: "وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَاجُكُمْ إِن لَّمْ يَكُن لَّهُنَّ وَلَدٌ",
        translation: "And for you is half of what your wives leave if they have no child."
      },
      madhab: {
        shafii: {
          reference: "Matn al-Rahbiyyah",
          arabic: "فَالنِّصْفُ فَرْضُ خَمْسَةٍ أَفْرَادِ الزَّوْجُ وَالأُنْثَى مِنَ الأَوْلاَدِ",
          translation: "Half is the prescribed share of five individuals: the husband and the female child."
        },
        hanafi: {
          reference: "Al-Sirajiyyah",
          arabic: "أما الزوج فله حالتان النصف عند عدم الولد وولد الابن وإن سفل",
          translation: "As for the husband, he has two states: one half in the absence of a child or child of a son howsoever low."
        },
        maliki: {
          reference: "Al-Arjuzah al-Jaybiyyah",
          arabic: "وللزوج النصف إن لم يكن للزوجة ولد",
          translation: "And the husband has a half if the wife has no child."
        },
        hanbali: {
          reference: "Nazm al-Mufradat",
          arabic: "فرض الزوج النصف مع عدم الولد",
          translation: "The prescribed share of the husband is a half with the absence of a child."
        }
      }
    },
    quarter_share: {
      ruleTitle: "Takes 1/4 due to presence of inheriting descendants.",
      quran: {
        reference: "Surah An-Nisa [4:12]",
        arabic: "فَإِن كَانَ لَهُنَّ وَلَدٌ فَلَكُمُ الرُّبُعُ مِمَّا تَرَكْنَ",
        translation: "But if they have a child, for you is one fourth of what they leave..."
      },
      madhab: {
        shafii: {
          reference: "Matn al-Rahbiyyah",
          arabic: "وَالرُّبْعُ فَرْضُ الزَّوْجِ إِنْ كَانَ مَعَهْ مِنْ وَلَدِ الزَّوْجَةِ مَنْ قَدْ مَنَعَهْ",
          translation: "A quarter is the husband's share if the wife has a child who reduces his share."
        },
        hanafi: {
          reference: "Al-Sirajiyyah",
          arabic: "والربع مع الولد أو ولد الابن وإن سفل",
          translation: "And one quarter with a child or son's child howsoever low."
        },
        maliki: {
          reference: "Al-Arjuzah al-Jaybiyyah",
          arabic: "والربع إن كان لها ولد",
          translation: "And a quarter if she has a child."
        },
        hanbali: {
          reference: "Nazm al-Mufradat",
          arabic: "والربع مع وجوده",
          translation: "And a quarter with their presence (the child)."
        }
      }
    }
  },

  // --- WIVES ---
  wives: {
    quarter_share: {
      ruleTitle: "Takes 1/4 due to absence of inheriting descendants.",
      quran: {
        reference: "Surah An-Nisa [4:12]",
        arabic: "وَلَهُنَّ الرُّبُعُ مِمَّا تَرَكْتُمْ إِن لَّمْ يَكُن لَّكُمْ وَلَدٌ",
        translation: "And for them [wives] is one fourth of what you leave if you have no child."
      },
      madhab: {
        shafii: {
          reference: "Matn al-Rahbiyyah",
          arabic: "وَالرُّبْعُ فَرْضُ الزَّوْجِ إِنْ كَانَ مَعَهْ... وَهُوَ لِكُلِّ زَوْجَةٍ أَوْ أَكْثَرَا مَعْ عَدَمِ الأَوْلاَدِ فِيمَا قُدِّرَا",
          translation: "And a quarter is... for every wife or more in the absence of children."
        },
        hanafi: {
          reference: "Al-Sirajiyyah",
          arabic: "وأما الزوجات فلهن حالتان الربع عند عدم الولد وولد الابن",
          translation: "As for the wives, they have two states: a quarter in the absence of a child..."
        },
        maliki: {
          reference: "Al-Arjuzah al-Jaybiyyah",
          arabic: "وللزوجة أو الزوجات الربع إن لم يكن للزوج ولد",
          translation: "And the wife or wives have a quarter if the husband has no child."
        },
        hanbali: {
          reference: "Nazm al-Mufradat",
          arabic: "فرض الزوجة الربع مع عدم الولد",
          translation: "The prescribed share of the wife is a quarter in the absence of a child."
        }
      }
    },
    eighth_share: {
      ruleTitle: "Takes 1/8 due to presence of inheriting descendants.",
      quran: {
        reference: "Surah An-Nisa [4:12]",
        arabic: "فَإِن كَانَ لَكُمْ وَلَدٌ فَلَهُنَّ الثُّمُنُ مِمَّا تَرَكْتُم",
        translation: "But if you have a child, for them is one eighth of what you leave..."
      },
      madhab: {
        shafii: {
          reference: "Matn al-Rahbiyyah",
          arabic: "وَالثُّمْنُ لِلزَّوْجَةِ وَالزَّوْجَاتِ مَعَ الْبَنِينَ أَوْ مَعَ الْبَنَاتِ",
          translation: "And an eighth is for the wife or wives in the presence of sons or daughters."
        },
        hanafi: {
          reference: "Al-Sirajiyyah",
          arabic: "والثمن مع الولد أو ولد الابن وإن سفل",
          translation: "And an eighth with a child or son's child howsoever low."
        },
        maliki: {
          reference: "Al-Arjuzah al-Jaybiyyah",
          arabic: "والثمن إن كان له ولد",
          translation: "And an eighth if he has a child."
        },
        hanbali: {
          reference: "Nazm al-Mufradat",
          arabic: "والثمن مع الولد",
          translation: "And an eighth with a child."
        }
      }
    }
  },

  // --- DAUGHTERS ---
  daughters: {
    half_share: {
      ruleTitle: "Takes 1/2 when she is the only daughter.",
      quran: {
        reference: "Surah An-Nisa [4:11]",
        arabic: "وَإِن كَانَتْ وَاحِدَةً فَلَهَا النِّصْفُ",
        translation: "And if there is only one, for her is half."
      },
      madhab: {
        shafii: {
          reference: "Matn al-Rahbiyyah",
          arabic: "وَالنِّصْفُ فَرْضُ... وَالأُنْثَى مِنَ الأَوْلاَدِ",
          translation: "And half is the share of... the female among the children."
        },
        hanafi: {
          reference: "Al-Sirajiyyah",
          arabic: "وأما البنات الصلبيات فأحوال ثلاث النصف للواحدة",
          translation: "As for the biological daughters, they have three states: half for one."
        },
        maliki: {
          reference: "Al-Arjuzah al-Jaybiyyah",
          arabic: "فرض البنت النصف",
          translation: "The prescribed share of the daughter is half."
        },
        hanbali: {
          reference: "Nazm al-Mufradat",
          arabic: "للبنت النصف",
          translation: "The daughter has half."
        }
      }
    },
    two_thirds_share: {
      ruleTitle: "Take 2/3 when there are two or more daughters.",
      quran: {
        reference: "Surah An-Nisa [4:11]",
        arabic: "فَإِن كُنَّ نِسَاءً فَوْقَ اثْنَتَيْنِ فَلَهُنَّ ثُلُثَا مَا تَرَكَ",
        translation: "But if there are daughters, two or more, for them is two thirds of one's estate."
      },
      madhab: {
        shafii: {
          reference: "Matn al-Rahbiyyah",
          arabic: "وَالثُّلْثَانِ لِلْبَنَاتِ جَمْعَا مَا زَادَ عَنْ وَاحِدَةٍ فَسَمْعَا",
          translation: "And two-thirds are for the daughters collectively, whatever exceeds one."
        },
        hanafi: {
          reference: "Al-Sirajiyyah",
          arabic: "والثلثان للاثنتين فصاعدا",
          translation: "And two-thirds for two or more."
        },
        maliki: {
          reference: "Al-Arjuzah al-Jaybiyyah",
          arabic: "وللاثنتين فأكثر الثلثان",
          translation: "And for two or more is two-thirds."
        },
        hanbali: {
          reference: "Nazm al-Mufradat",
          arabic: "وللبنات الثلثان",
          translation: "And the daughters have two-thirds."
        }
      }
    }
  },

  // --- SONS ---
  sons: {
    asabah: {
      ruleTitle: "Takes the remainder as the primary residuary (Asabah).",
      quran: {
        reference: "Surah An-Nisa [4:11]",
        arabic: "يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ",
        translation: "Allah instructs you concerning your children: for the male, what is equal to the share of two females."
      },
      madhab: {
        shafii: {
          reference: "Matn al-Rahbiyyah",
          arabic: "وَمَا لِذِي التَّعْصِيبِ مِنْ مُقَدَّرِ، بَلْ حَوْزُهُ الْمَالَ أَوِ الْمُؤَخَّرِ... وَالِابْنُ أَقْوَى عُصْبَةٍ بِيَقِينِ",
          translation: "And there is no fixed share for the residuary, rather he acquires the whole wealth or the remainder... and the son is the strongest."
        },
        hanafi: {
          reference: "Al-Sirajiyyah",
          arabic: "العصبات بنفسه أربعة أصناف فصنف جزء الميت وهم البنون",
          translation: "The residuaries by themselves are of four categories: the first is the portion of the deceased, and they are the sons."
        },
        maliki: {
          reference: "Al-Arjuzah al-Jaybiyyah",
          arabic: "الابن عاصب بنفسه يحوز جميع المال إذا انفرد أو الباقي",
          translation: "The son is a residuary by himself; he acquires all the wealth if alone, or the remainder."
        },
        hanbali: {
          reference: "Nazm al-Mufradat",
          arabic: "الابن عصبة بالنفس مقدم على غيره ويأخذ ما أبقت الفروض",
          translation: "The son is a residuary by himself, prioritized over others, and takes what the prescribed shares leave."
        }
      }
    }
  }

  // You can continue adding the rest of the heirs (Mother, Father, Siblings) using this exact same pattern!
};