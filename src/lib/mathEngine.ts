// src/lib/mathEngine.ts
import { proofsDatabase, ShareProof } from './proofsData';

export interface HeirsList {
  husband: number; wives: number; sons: number; daughters: number;
  grandsons: number; granddaughters: number; father: number; mother: number;
  paternal_grandfather: number; paternal_grandmother: number; maternal_grandmother: number;
  full_brothers: number; full_sisters: number; paternal_brothers: number;
  paternal_sisters: number; maternal_siblings: number; unborn_foetus: number;
}

export function calculateUltimateRahbiyyah(heirs: HeirsList, selectedMadhab: string = 'shafii', netAssetValue: number = 100000) {
  if (heirs.husband > 0 && heirs.wives > 0) return [{ name: 'Error', percentage: 100, fraction: 'N/A', rule: 'Invalid Spouses' }];

  let reservedAmount = 0.0;
  let reserveFraction = 0.0;
  let results: any[] = [];
  
  if (heirs.unborn_foetus > 0) {
    // FIXED: The Maliki Escrow now perfectly matches the required Dashboard structure
    if (selectedMadhab === 'maliki') {
      return [{ 
        name: 'Unborn Foetus Escrow', 
        percentage: 100, 
        amount: netAssetValue, 
        fraction: 'Distribution Frozen', 
        rule: 'Maliki School mandates freezing the entire division until live birth.',
        quranProof: { arabic: "يُوقَفُ لِلْحَمْلِ...", translation: "Suspended for the pregnancy...", reference: "Ijma" },
        madhabProof: { arabic: "ويوقف تقسيم التركة حتى يتبين الحمل", translation: "And the division of the estate is suspended until the pregnancy becomes manifest.", reference: "Al-Jaybiyyah" }
      }];
    }
    
    if (selectedMadhab === 'shafii') reserveFraction = 0.60; 
    else if (selectedMadhab === 'hanbali') reserveFraction = 0.40; 
    else if (selectedMadhab === 'hanafi') reserveFraction = 0.25; 
    reservedAmount = netAssetValue * reserveFraction;
    
    results.push({ 
        name: 'Unborn Foetus Escrow', percentage: reserveFraction * 100, amount: reservedAmount, fraction: 'Reserved Escrow', 
        rule: 'Maximum estimation reserved pending live birth.',
        quranProof: { arabic: "يُوقَفُ لِلْحَمْلِ...", translation: "Suspended for the pregnancy...", reference: "Ijma" },
        madhabProof: { arabic: "يُوقَفُ لِلْحَمْلِ مِنَ التَّرِكَةِ النَّصِيبُ الأَوْفَرُ...", translation: "The most abundant share is suspended...", reference: "Classical Jurisprudence" }
    });
  }

  let activeWealthFraction = 1.0 - reserveFraction;
  let hasDescendants = heirs.sons > 0 || heirs.daughters > 0 || heirs.grandsons > 0 || heirs.granddaughters > 0 || heirs.unborn_foetus > 0;
  let totalSiblings = heirs.full_brothers + heirs.full_sisters + heirs.paternal_brothers + heirs.paternal_sisters + heirs.maternal_siblings;
  
  let isGharrawayn = heirs.mother === 1 && heirs.father === 1 && !hasDescendants && totalSiblings < 2 && (heirs.husband === 1 || heirs.wives > 0) && heirs.paternal_grandfather === 0 && heirs.paternal_grandmother === 0 && heirs.maternal_grandmother === 0;
  let isAkdariyyah = selectedMadhab !== 'hanafi' && heirs.husband === 1 && heirs.mother === 1 && heirs.paternal_grandfather === 1 && heirs.full_sisters === 1 && heirs.father === 0 && !hasDescendants && heirs.full_brothers === 0 && heirs.wives === 0 && heirs.maternal_siblings === 0;

  let shares: Record<string, number> = {};
  let residues: Record<string, number> = {};
  let specialRules: Record<string, string> = {};

  if (isAkdariyyah) {
    shares['Husband'] = 9 / 27; shares['Mother'] = 6 / 27; shares['Paternal Grandfather'] = 8 / 27; shares['Full Sisters'] = 4 / 27;
    specialRules['Husband'] = 'akdariyyah'; specialRules['Mother'] = 'akdariyyah'; specialRules['Paternal Grandfather'] = 'akdariyyah'; specialRules['Full Sisters'] = 'akdariyyah';
  } else {
    if (heirs.husband > 0) shares['Husband'] = hasDescendants ? 1 / 4 : 1 / 2;
    if (heirs.wives > 0) shares['Wives'] = hasDescendants ? 1 / 8 : 1 / 4;
    if (heirs.father > 0) shares['Father'] = hasDescendants ? 1 / 6 : 0.0;
    
    if (heirs.mother > 0) {
      if (isGharrawayn) {
        shares['Mother'] = (1 - (shares['Husband'] || shares['Wives'] || 0)) / 3;
        specialRules['Mother'] = 'gharrawayn';
      } else shares['Mother'] = (hasDescendants || totalSiblings >= 2) ? 1 / 6 : 1 / 3;
    }

    if (heirs.sons === 0 && heirs.daughters > 0) shares['Daughters'] = heirs.daughters === 1 ? 1 / 2 : 2 / 3;

    let activeBrothers = heirs.full_brothers;
    let activeSisters = heirs.full_sisters;
    
    if (heirs.father > 0 || heirs.sons > 0 || heirs.grandsons > 0 || (heirs.paternal_grandfather > 0 && selectedMadhab === 'hanafi')) {
      activeBrothers = 0; activeSisters = 0; 
    }

    let fullSistersAsabah = activeSisters > 0 && activeBrothers === 0 && (heirs.daughters > 0 || heirs.granddaughters > 0);

    if (activeSisters > 0 && activeBrothers === 0 && !fullSistersAsabah && !isAkdariyyah) {
      shares['Full Sisters'] = activeSisters === 1 ? 1 / 2 : 2 / 3;
    }

    let totalFixedShares = Object.values(shares).reduce((sum, val) => sum + val, 0.0);
    if (totalFixedShares > 1.0) {
      for (let key in shares) shares[key] = shares[key] / totalFixedShares;
      totalFixedShares = 1.0;
    }

    let remainingWealth = activeWealthFraction - (totalFixedShares * activeWealthFraction);

    if (remainingWealth > 0.0001) {
      if (heirs.sons > 0) {
        let partValue = remainingWealth / ((heirs.sons * 2) + heirs.daughters);
        residues['Sons'] = partValue * 2 * heirs.sons;
        if (heirs.daughters > 0) residues['Daughters'] = partValue * heirs.daughters;
      } else if (heirs.father > 0) {
        residues['Father'] = remainingWealth;
        if (isGharrawayn) specialRules['Father'] = 'gharrawayn';
      } else if (activeBrothers > 0) {
        let partValue = remainingWealth / ((activeBrothers * 2) + activeSisters);
        residues['Full Brothers'] = partValue * 2 * activeBrothers;
        if (activeSisters > 0) residues['Full Sisters'] = partValue * activeSisters;
      } else if (fullSistersAsabah) residues['Full Sisters'] = remainingWealth; 
    }
  }

  // --- THE IRONCLAD INTERCEPTOR ---
  const getProofObj = (key: string, rule: string) => {
    
    if (rule === 'gharrawayn') {
      return {
        ruleTitle: "Al-Gharrawayn (Umariyyatan)",
        quran: {
          reference: "Ijtihaad of Umar ibn al-Khattab",
          arabic: "قَضَى عُمَرُ رَضِيَ اللَّهُ عَنْهُ فِي زَوْجٍ وَأَبَوَيْنِ... لِلْأُمِّ ثُلُثُ مَا تَبْقَى",
          translation: "Umar (RA) judged that the mother receives a third of what remains."
        },
        madhab: {
          shafii: { reference: "Matn al-Rahbiyyah", arabic: "وَإِنْ يَكُنْ زَوْجٌ وَأُمٌّ وَأَبُ... فَثُلْثُ مَا يَبْقَى لَهَا مُرَتَّبُ", translation: "And if there is a husband, mother, and father... then a third of what remains is established for her." },
          hanafi: { reference: "Al-Sirajiyyah", arabic: "وثلث ما يبقى بعد فرض أحد الزوجين في مسألتين", translation: "And a third of what remains after the share of one of the spouses in two issues..." },
          maliki: { reference: "Al-Arjuzah al-Jaybiyyah", arabic: "وفي الغراوين ثلث الباقي للأم", translation: "And in the two Gharrawayn cases, a third of the remainder is for the mother." },
          hanbali: { reference: "Nazm al-Mufradat", arabic: "ولها ثلث الباقي في العمريتين", translation: "And she has a third of the remainder in the two Umariyyah cases." }
        }
      };
    }

    let proof: ShareProof | undefined = undefined;
    if (key.includes('Husband')) proof = hasDescendants ? proofsDatabase?.husband?.quarter_share : proofsDatabase?.husband?.half_share;
    else if (key.includes('Wives')) proof = hasDescendants ? proofsDatabase?.wives?.eighth_share : proofsDatabase?.wives?.quarter_share;
    else if (key.includes('Daughters')) proof = heirs.daughters > 1 ? proofsDatabase?.daughters?.two_thirds_share : proofsDatabase?.daughters?.half_share;
    else if (key.includes('Sons')) proof = proofsDatabase?.sons?.asabah;
    else if (key.includes('Mother')) proof = proofsDatabase?.mother?.general;
    else if (key.includes('Father') || key.includes('Paternal Grandfather')) proof = proofsDatabase?.father?.general;
    else if (key.includes('Full Brothers') || key.includes('Full Sisters')) proof = proofsDatabase?.full_brothers?.general;

    if (!proof || !proof.quran || !proof.madhab) {
      return {
        ruleTitle: "Fara'id Verification",
        quran: { arabic: "يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ", translation: "Allah commands you regarding your estate...", reference: "Al-Qur'an" },
        madhab: {
          shafii: { arabic: "قاعدة عامة", translation: "General rules of distribution apply.", reference: "Al-Rahbiyyah" },
          hanafi: { arabic: "قاعدة عامة", translation: "General rules of distribution apply.", reference: "Al-Sirajiyyah" },
          maliki: { arabic: "قاعدة عامة", translation: "General rules of distribution apply.", reference: "Al-Jaybiyyah" },
          hanbali: { arabic: "قاعدة عامة", translation: "General rules of distribution apply.", reference: "Nazm al-Mufradat" }
        }
      };
    }

    return proof;
  };

  const toFractionString = (decimal: number) => {
    const eps = 0.005;
    if (Math.abs(decimal - 0.5) < eps) return "1/2";
    if (Math.abs(decimal - 0.25) < eps) return "1/4";
    if (Math.abs(decimal - 0.125) < eps) return "1/8";
    if (Math.abs(decimal - 0.666) < eps) return "2/3";
    if (Math.abs(decimal - 0.333) < eps) return "1/3";
    if (Math.abs(decimal - 0.166) < eps) return "1/6";
    return "Calculated"; 
  };

  for (let [heirKey, val] of Object.entries(shares)) {
    if (val > 0) {
      let displayName = specialRules[heirKey] === 'gharrawayn' ? `${heirKey} (Al-Gharrawayn)` : heirKey;
      let proof = getProofObj(heirKey, specialRules[heirKey] || '');

      results.push({ 
         name: displayName, percentage: Number((val * 100).toFixed(2)), amount: netAssetValue * val,  
         fraction: toFractionString(val), rule: proof.ruleTitle,
         quranProof: proof.quran, madhabProof: proof.madhab[selectedMadhab as keyof typeof proof.madhab] || proof.madhab.shafii
      });
    }
  }

  for (let [heirKey, val] of Object.entries(residues)) {
    if (val > 0) {
      let displayName = specialRules[heirKey] === 'gharrawayn' ? `${heirKey} (Al-Gharrawayn)` : heirKey;
      let proof = getProofObj(heirKey, specialRules[heirKey] || '');

      results.push({ 
         name: displayName, percentage: Number((val * 100).toFixed(2)), amount: netAssetValue * val,  
         fraction: 'Residuary (Asabah)', rule: proof.ruleTitle,
         quranProof: proof.quran, madhabProof: proof.madhab[selectedMadhab as keyof typeof proof.madhab] || proof.madhab.shafii
      });
    }
  }

  return results.sort((a, b) => b.percentage - a.percentage);
}