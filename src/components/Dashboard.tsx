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

export const proofsDatabase: Record<string, Record<string, ShareProof>> = {
  
  // --- HUSBAND ---
  husband: {
    half_share: {
      ruleTitle: "Takes 1/2 due to absence of inheriting descendants.",
      quran: { reference: "Surah An-Nisa [4:12]", arabic: "وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَاجُكُمْ إِن لَّمْ يَكُن لَّهُنَّ وَلَدٌ", translation: "And for you is half of what your wives leave if they have no child." },
      madhab: {
        shafii: { reference: "Matn al-Rahbiyyah", arabic: "فَالنِّصْفُ فَرْضُ خَمْسَةٍ أَفْرَادِ الزَّوْجُ وَالأُنْثَى مِنَ الأَوْلاَدِ", translation: "Half is the prescribed share of five individuals: the husband and the female child." },
        hanafi: { reference: "Al-Sirajiyyah", arabic: "أما الزوج فله حالتان النصف عند عدم الولد وولد الابن وإن سفل", translation: "As for the husband, he has two states: one half in the absence of a child or child of a son howsoever low." },
        maliki: { reference: "Al-Arjuzah al-Jaybiyyah", arabic: "وللزوج النصف إن لم يكن للزوجة ولد", translation: "And the husband has a half if the wife has no child." },
        hanbali: { reference: "Nazm al-Mufradat", arabic: "فرض الزوج النصف مع عدم الولد", translation: "The prescribed share of the husband is a half with the absence of a child." }
      }
    },
    quarter_share: {
      ruleTitle: "Takes 1/4 due to presence of inheriting descendants.",
      quran: { reference: "Surah An-Nisa [4:12]", arabic: "فَإِن كَانَ لَهُنَّ وَلَدٌ فَلَكُمُ الرُّبُعُ مِمَّا تَرَكْنَ", translation: "But if they have a child, for you is one fourth of what they leave..." },
      madhab: {
        shafii: { reference: "Matn al-Rahbiyyah", arabic: "وَالرُّبْعُ فَرْضُ الزَّوْجِ إِنْ كَانَ مَعَهْ مِنْ وَلَدِ الزَّوْجَةِ مَنْ قَدْ مَنَعَهْ", translation: "A quarter is the husband's share if the wife has a child who reduces his share." },
        hanafi: { reference: "Al-Sirajiyyah", arabic: "والربع مع الولد أو ولد الابن وإن سفل", translation: "And one quarter with a child or son's child howsoever low." },
        maliki: { reference: "Al-Arjuzah al-Jaybiyyah", arabic: "والربع إن كان لها ولد", translation: "And a quarter if she has a child." },
        hanbali: { reference: "Nazm al-Mufradat", arabic: "والربع مع وجوده", translation: "And a quarter with their presence (the child)." }
      }
    }
  },

  // --- WIVES ---
  wives: {
    quarter_share: {
      ruleTitle: "Takes 1/4 due to absence of inheriting descendants.",
      quran: { reference: "Surah An-Nisa [4:12]", arabic: "وَلَهُنَّ الرُّبُعُ مِمَّا تَرَكْتُمْ إِن لَّمْ يَكُن لَّكُمْ وَلَدٌ", translation: "And for them [wives] is one fourth of what you leave if you have no child." },
      madhab: {
        shafii: { reference: "Matn al-Rahbiyyah", arabic: "وَالرُّبْعُ فَرْضُ الزَّوْجِ إِنْ كَانَ مَعَهْ... وَهُوَ لِكُلِّ زَوْجَةٍ أَوْ أَكْثَرَا مَعْ عَدَمِ الأَوْلاَدِ فِيمَا قُدِّرَا", translation: "And a quarter is... for every wife or more in the absence of children." },
        hanafi: { reference: "Al-Sirajiyyah", arabic: "وأما الزوجات فلهن حالتان الربع عند عدم الولد وولد الابن", translation: "As for the wives, they have two states: a quarter in the absence of a child..." },
        maliki: { reference: "Al-Arjuzah al-Jaybiyyah", arabic: "وللزوجة أو الزوجات الربع إن لم يكن للزوج ولد", translation: "And the wife or wives have a quarter if the husband has no child." },
        hanbali: { reference: "Nazm al-Mufradat", arabic: "فرض الزوجة الربع مع عدم الولد", translation: "The prescribed share of the wife is a quarter in the absence of a child." }
      }
    },
    eighth_share: {
      ruleTitle: "Takes 1/8 due to presence of inheriting descendants.",
      quran: { reference: "Surah An-Nisa [4:12]", arabic: "فَإِن كَانَ لَكُمْ وَلَدٌ فَلَهُنَّ الثُّمُنُ مِمَّا تَرَكْتُم", translation: "But if you have a child, for them is one eighth of what you leave..." },
      madhab: {
        shafii: { reference: "Matn al-Rahbiyyah", arabic: "وَالثُّمْنُ لِلزَّوْجَةِ وَالزَّوْجَاتِ مَعَ الْبَنِينَ أَوْ مَعَ الْبَنَاتِ", translation: "And an eighth is for the wife or wives in the presence of sons or daughters." },
        hanafi: { reference: "Al-Sirajiyyah", arabic: "والثمن مع الولد أو ولد الابن وإن سفل", translation: "And an eighth with a child or son's child howsoever low." },
        maliki: { reference: "Al-Arjuzah al-Jaybiyyah", arabic: "والثمن إن كان له ولد", translation: "And an eighth if he has a child." },
        hanbali: { reference: "Nazm al-Mufradat", arabic: "والثمن مع الولد", translation: "And an eighth with a child." }
      }
    }
  },

  // --- DAUGHTERS ---
  daughters: {
    half_share: {
      ruleTitle: "Takes 1/2 when she is the only daughter.",
      quran: { reference: "Surah An-Nisa [4:11]", arabic: "وَإِن كَانَتْ وَاحِدَةً فَلَهَا النِّصْفُ", translation: "And if there is only one, for her is half." },
      madhab: {
        shafii: { reference: "Matn al-Rahbiyyah", arabic: "وَالنِّصْفُ فَرْضُ... وَالأُنْثَى مِنَ الأَوْلاَدِ", translation: "And half is the share of... the female among the children." },
        hanafi: { reference: "Al-Sirajiyyah", arabic: "وأما البنات الصلبيات فأحوال ثلاث النصف للواحدة", translation: "As for the biological daughters, they have three states: half for one." },
        maliki: { reference: "Al-Arjuzah al-Jaybiyyah", arabic: "فرض البنت النصف", translation: "The prescribed share of the daughter is half." },
        hanbali: { reference: "Nazm al-Mufradat", arabic: "للبنت النصف", translation: "The daughter has half." }
      }
    },
    two_thirds_share: {
      ruleTitle: "Take 2/3 when there are two or more daughters.",
      quran: { reference: "Surah An-Nisa [4:11]", arabic: "فَإِن كُنَّ نِسَاءً فَوْقَ اثْنَتَيْنِ فَلَهُنَّ ثُلُثَا مَا تَرَكَ", translation: "But if there are daughters, two or more, for them is two thirds of one's estate." },
      madhab: {
        shafii: { reference: "Matn al-Rahbiyyah", arabic: "وَالثُّلْثَانِ لِلْبَنَاتِ جَمْعَا مَا زَادَ عَنْ وَاحِدَةٍ فَسَمْعَا", translation: "And two-thirds are for the daughters collectively, whatever exceeds one." },
        hanafi: { reference: "Al-Sirajiyyah", arabic: "والثلثان للاثنتين فصاعدا", translation: "And two-thirds for two or more." },
        maliki: { reference: "Al-Arjuzah al-Jaybiyyah", arabic: "وللاثنتين فأكثر الثلثان", translation: "And for two or more is two-thirds." },
        hanbali: { reference: "Nazm al-Mufradat", arabic: "وللبنات الثلثان", translation: "And the daughters have two-thirds." }
      }
    }
  },

  // --- SONS ---
  sons: {
    asabah: {
      ruleTitle: "Takes the remainder as the primary residuary (Asabah).",
      quran: { reference: "Surah An-Nisa [4:11]", arabic: "يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ", translation: "Allah instructs you concerning your children: for the male, what is equal to the share of two females." },
      madhab: {
        shafii: { reference: "Matn al-Rahbiyyah", arabic: "وَالِابْنُ أَقْوَى عُصْبَةٍ بِيَقِينِ", translation: "And the son is the strongest in the residual group with certainty." },
        hanafi: { reference: "Al-Sirajiyyah", arabic: "العصبات بنفسه أربعة أصناف فصنف جزء الميت وهم البنون", translation: "The residuals by themselves are of four categories: the first is the portion of the deceased, and they are the sons..." },
        maliki: { reference: "Al-Arjuzah al-Jaybiyyah", arabic: "الابن عاصب بنفسه يحوز جميع المال إذا انفرد أو الباقي بعد ذوي الفروض", translation: "The son is a residual by himself; he acquires all the wealth if alone, or the remainder after those with prescribed shares." },
        hanbali: { reference: "Nazm al-Mufradat", arabic: "الابن عصبة بالنفس مقدم على غيره ويأخذ ما أبقت الفروض", translation: "The son is a residuary by himself, prioritized over others, and takes what the prescribed shares leave behind." }
      }
    }
  },

  // --- MOTHER ---
  mother: {
    general: {
      ruleTitle: "Mother's Prescribed Share",
      quran: { reference: "Surah An-Nisa [4:11]", arabic: "فَإِن لَّمْ يَكُن لَّهُ وَلَدٌ وَوَرِثَهُ أَبَوَاهُ فَلِأُمِّهِ الثُّلُثُ ۚ فَإِن كَانَ لَهُ إِخْوَةٌ فَلِأُمِّهِ السُّدُسُ", translation: "...But if he has no child and his parents inherit from him, then for his mother is one third. And if he has brothers/sisters, for his mother is one sixth..." },
      madhab: {
        shafii: { reference: "Matn al-Rahbiyyah", arabic: "وَالثُّلْثُ فَرْضُ الأُمِّ حَيْثُ لاَ وَلَدْ... وَالسُّدْسُ فَرْضُ... الأُمِّ حَيْثُ الشَّخْصُ نَجْلَهُ فَقَدْ", translation: "And a third is the prescribed share of the mother where there is no child... and a sixth is the prescribed share... of the mother when the deceased leaves descendants or siblings." },
        hanafi: { reference: "Al-Sirajiyyah", arabic: "وللأم أحوال ثلاث السدس مع الولد أو ولد الابن... أو مع اثنين من الإخوة... والثلث عند عدم هؤلاء", translation: "The mother has three states: a sixth with a child or son's child... or with two siblings... and a third in the absence of these." },
        maliki: { reference: "Al-Arjuzah al-Jaybiyyah", arabic: "وللأم الثلث إن لم يكن ولد ولا عدد من الإخوة، والسدس مع أحدهما", translation: "The mother receives a third if there is no child nor multiple siblings, and a sixth in the presence of either." },
        hanbali: { reference: "Nazm al-Mufradat", arabic: "فرض الأم الثلث مع عدم الولد والإخوة والسدس مع وجود أحدهما", translation: "The prescribed share of the mother is a third in the absence of a child and siblings, and a sixth in the presence of either." }
      }
    }
  },

  // --- FATHER ---
  father: {
    general: {
      ruleTitle: "Father's Prescribed Share & Ta'seeb",
      quran: { reference: "Surah An-Nisa [4:11]", arabic: "وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ مِمَّا تَرَكَ إِن كَانَ لَهُ وَلَدٌ", translation: "And for his parents, to each one of them is a sixth of his estate if he left children." },
      madhab: {
        shafii: { reference: "Matn al-Rahbiyyah", arabic: "وَالسُّدْسُ فَرْضُ سَبْعَةٍ مِنَ الْعَدَدِ أَبٌ وَأُمٌّ... وَالأَبُ ذُو التَّعْصِيبِ حِينَ يُفْقَدُ مَنْ حَازَ سَهْماً", translation: "And a sixth is the prescribed share of seven: a father, a mother... and the father has Ta'seeb (residuary) when the designated sharers are absent." },
        hanafi: { reference: "Al-Sirajiyyah", arabic: "وللأب أحوال ثلاث الفرض المطلق وهو السدس مع الابن... والتعصيب المحض عند عدم الولد", translation: "The father has three states: the absolute prescribed share which is a sixth with a son... and pure Ta'seeb in the absence of a child." },
        maliki: { reference: "Al-Arjuzah al-Jaybiyyah", arabic: "وللأب السدس مع الولد الذكر، والتعصيب مع عدم الولد", translation: "The father receives a sixth with a male child, and is a residuary in the absence of a child." },
        hanbali: { reference: "Nazm al-Mufradat", arabic: "وللأب السدس مع الولد والتعصيب مع عدمه", translation: "And for the father is a sixth with a child, and Ta'seeb in their absence." }
      }
    }
  },

  // --- FULL BROTHERS ---
  full_brothers: {
    general: {
      ruleTitle: "Full Brothers (Residuary / Exclusions)",
      quran: { reference: "Surah An-Nisa [4:176]", arabic: "وَإِن كَانُوا إِخْوَةً رِّجَالًا وَنِسَاءً فَلِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ", translation: "If there are both brothers and sisters, the male will have the share of two females." },
      madhab: {
        shafii: { reference: "Matn al-Rahbiyyah", arabic: "وَبِالْبَنِينَ الإِخْوَةُ الأَشِقَّاء... مَحْجُوبُونَ", translation: "And by the sons, the full brothers are blocked..." },
        hanafi: { reference: "Al-Sirajiyyah", arabic: "ثم العصبات بأنفسهم... ثم إخوة لأب وأم", translation: "Then the residuaries by themselves... then the brothers from the father and mother." },
        maliki: { reference: "Al-Arjuzah al-Jaybiyyah", arabic: "والإخوة الأشقاء عصبة يسقطون بالابن والأب", translation: "The full brothers are residuaries, they are excluded by the son and the father." },
        hanbali: { reference: "Nazm al-Mufradat", arabic: "والإخوة لأبوين عصبة يسقطون بالابن والأب", translation: "And the brothers from two parents are residuaries, excluded by the son and the father." }
      }
    }
  },

  // --- FULL SISTERS ---
  full_sisters: {
    general: {
      ruleTitle: "Full Sisters Share",
      quran: { reference: "Surah An-Nisa [4:176]", arabic: "إِنِ امْرُؤٌ هَلَكَ لَيْسَ لَهُ وَلَدٌ وَلَهُ أُخْتٌ فَلَهَا نِصْفُ مَا تَرَكَ... فَإِن كَانَتَا اثْنَتَيْنِ فَلَهُمَا الثُّلُثَانِ", translation: "If a man dies, leaving no child but [only] a sister, she will have half of what he left... But if there are two sisters, they will have two-thirds..." },
      madhab: {
        shafii: { reference: "Matn al-Rahbiyyah", arabic: "وَالنِّصْفُ فَرْضُ... وَالأُخْتُ مِنْ أَبَوَيْنِ أَوْ مِنْ أَبِ... وَالأَخَوَاتُ إِنْ تَكُنْ بَنَاتُ فُهُنَّ مَعْهُنَّ مُعَصَّبَاتُ", translation: "And half is the share... of the sister from two parents... And if there are daughters, then the sisters with them become residuaries." },
        hanafi: { reference: "Al-Sirajiyyah", arabic: "وأما الأخوات لأب وأم فلهن أحوال... النصف للواحدة... والثلثان للاثنتين... ومع البنات يكن عصبات", translation: "As for full sisters, they have states: half for one... two-thirds for two... and with daughters they become residuaries." },
        maliki: { reference: "Al-Arjuzah al-Jaybiyyah", arabic: "وللأخت الشقيقة النصف، وللاثنتين الثلثان، وتصير عصبة مع البنات", translation: "The full sister receives a half, and two receive two-thirds, and she becomes a residuary with daughters." },
        hanbali: { reference: "Nazm al-Mufradat", arabic: "وللأخت لأبوين النصف وللأخوات الثلثان ويعصبن مع البنات", translation: "And for the full sister is a half, and for sisters two-thirds, and they become residuaries with daughters." }
      }
    }
  },

  // --- COMPLEX ISSUES (Akdariyyah, Mushtarakah, Gharrawayn) ---
  complex_cases: {
    gharrawayn: {
      ruleTitle: "Al-Gharrawayn (Umariyyatan)",
      quran: { reference: "Ijtihaad of Umar ibn al-Khattab", arabic: "قَضَى عُمَرُ رَضِيَ اللَّهُ عَنْهُ فِي زَوْجٍ وَأَبَوَيْنِ... لِلْأُمِّ ثُلُثُ مَا تَبْقَى", translation: "Umar (RA) judged that the mother receives a third of what remains." },
      madhab: {
        shafii: { reference: "Matn al-Rahbiyyah", arabic: "وَإِنْ يَكُنْ زَوْجٌ وَأُمٌّ وَأَبُ... فَثُلْثُ مَا يَبْقَى لَهَا مُرَتَّبُ", translation: "And if there is a husband, mother, and father... then a third of what remains is established for her." },
        hanafi: { reference: "Al-Sirajiyyah", arabic: "وثلث ما يبقى بعد فرض أحد الزوجين في مسألتين", translation: "And a third of what remains after the share of one of the spouses in two issues..." },
        maliki: { reference: "Al-Arjuzah al-Jaybiyyah", arabic: "وفي الغراوين ثلث الباقي للأم", translation: "And in the two Gharrawayn cases, a third of the remainder is for the mother." },
        hanbali: { reference: "Nazm al-Mufradat", arabic: "ولها ثلث الباقي في العمريتين", translation: "And she has a third of the remainder in the two Umariyyah cases." }
      }
    },
    akdariyyah: {
      ruleTitle: "Al-Akdariyyah Exception",
      quran: { reference: "Famous Case of Al-Akdariyyah", arabic: "مسألة الأكدرية: كدرت على زيد بن ثابت أصوله", translation: "The Akdariyyah Case: It troubled Zayd ibn Thabit's principles..." },
      madhab: {
        shafii: { reference: "Matn al-Rahbiyyah", arabic: "وَالأُخْتُ لاَ فَرْضَ مَعَ الْجَدِّ لَهَا... إِلاَّ فِي الأَكْدَرِيَّةِ الْمَعْرُوفَةِ", translation: "And the sister has no fixed share with the grandfather... except in the well-known Akdariyyah." },
        hanafi: { reference: "Al-Sirajiyyah", arabic: "الجد كالأب يسقط الأخوات", translation: "The grandfather is like the father, he completely excludes the sisters." },
        maliki: { reference: "Al-Arjuzah al-Jaybiyyah", arabic: "وفي الأكدرية يعولان ثم يقسمان للذكر مثل حظ الأنثيين", translation: "And in Al-Akdariyyah they perform Awl, then they divide it..." },
        hanbali: { reference: "Nazm al-Mufradat", arabic: "وفي الأكدرية تضم سهامهما وتقسم أثلاثا", translation: "And in Al-Akdariyyah their shares are combined and divided in thirds." }
      }
    },
    mushtarakah: {
      ruleTitle: "Al-Mushtarakah / Al-Himariyyah",
      quran: { reference: "Ijtihaad of Umar & Zayd", arabic: "هَبْ أَنَّ أَبَانَا كَانَ حِمَارًا، أَلَسْنَا مِنْ أُمٍّ وَاحِدَةٍ؟", translation: "'Assume our father was a donkey, are we not from the same mother?'" },
      madhab: {
        shafii: { reference: "Matn al-Rahbiyyah", arabic: "فَاجْعَلْهُمُ كُلَّهُمْ لِأُمِّ", translation: "Make them all share as maternal siblings." },
        hanafi: { reference: "Al-Sirajiyyah", arabic: "ويسقط الإخوة لأب وأم... لأنهم عصبات", translation: "The full brothers are excluded... because they are residuaries and nothing remains." },
        maliki: { reference: "Al-Arjuzah al-Jaybiyyah", arabic: "ويشترك الإخوة الأشقاء مع الإخوة لأم في الثلث", translation: "And the full brothers share with the maternal brothers in the third..." },
        hanbali: { reference: "Nazm al-Mufradat", arabic: "ولا اشتراك بين الإخوة الأشقاء والإخوة لأم", translation: "There is no sharing between full brothers and maternal brothers." }
      }
    }
  }
};