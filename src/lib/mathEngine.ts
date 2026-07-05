// src/lib/mathEngine.ts
import { proofsDatabase } from './proofsData';

// 1. THIS SILENCES THE "ANY" WARNING: We tell TypeScript exactly what an Heir object looks like.
export interface HeirsList {
  husband: number; wives: number; sons: number; daughters: number;
  grandsons: number; granddaughters: number; father: number; mother: number;
  paternal_grandfather: number; paternal_grandmother: number; maternal_grandmother: number;
  full_brothers: number; full_sisters: number; paternal_brothers: number;
  paternal_sisters: number; maternal_siblings: number; unborn_foetus: number;
}

/**
 * THE AL-RAHBIYYAH FRAMEWORK - V7.1 (THE MASTERPIECE)
 * Complete Multi-Madhab Engine + Dynamic Muqasamah (Grandfather vs. Siblings)
 * Integrated with Dual-Authority Proofs Database & Strict Typing
 */

export function calculateUltimateRahbiyyah(heirs: HeirsList, selectedMadhab: string = 'shafii', netAssetValue: number = 100000) {
  if (heirs.husband > 0 && heirs.wives > 0) return [{ name: 'Error', percentage: 100, fraction: 'N/A', rule: 'Invalid Spouses - Cannot have both Husband and Wives alive.' }];

  let reservedAmount = 0.0;
  let reserveFraction = 0.0;
  let results: any[] = [];
  
  if (heirs.unborn_foetus > 0) {
    if (selectedMadhab === 'maliki') return [{ name: 'Unborn Foetus Escrow', percentage: 100, fraction: 'Distribution Frozen (Maliki)', rule: 'Maliki School mandates freezing division until birth.' }];
    if (selectedMadhab === 'shafii') reserveFraction = 0.60; 
    else if (selectedMadhab === 'hanbali') reserveFraction = 0.40; 
    else if (selectedMadhab === 'hanafi') reserveFraction = 0.25; 
    reservedAmount = netAssetValue * reserveFraction;
    
    results.push({ 
        name: 'Unborn Foetus Escrow', 
        percentage: reserveFraction * 100, 
        amount: reservedAmount,
        fraction: 'Reserved Escrow', 
        rule: 'Maximum estimation reserved pending live birth.',
        quranProof: { arabic: "يُوقَفُ لِلْحَمْلِ...", translation: "Suspended for the pregnancy...", reference: "Ijma" },
        madhabProof: { arabic: "يُوقَفُ لِلْحَمْلِ مِنَ التَّرِكَةِ النَّصِيبُ...", translation: "The most abundant share is suspended...", reference: "Classical Jurisprudence" }
    });
  }

  let activeWealthFraction = 1.0 - reserveFraction;
  
  let hasDescendants = heirs.sons > 0 || heirs.daughters > 0 || heirs.grandsons > 0 || heirs.granddaughters > 0 || heirs.unborn_foetus > 0;
  let totalSiblings = heirs.full_brothers + heirs.full_sisters + heirs.paternal_brothers + heirs.paternal_sisters + heirs.maternal_siblings;
  
  let isGharrawayn = heirs.mother === 1 && heirs.father === 1 && !hasDescendants && totalSiblings < 2 && (heirs.husband === 1 || heirs.wives > 0) && heirs.paternal_grandfather === 0 && heirs.paternal_grandmother === 0 && heirs.maternal_grandmother === 0;
  let isMushtarakah = (selectedMadhab === 'shafii' || selectedMadhab === 'maliki') && heirs.husband === 1 && heirs.mother === 1 && heirs.maternal_siblings >= 2 && heirs.full_brothers > 0 && !hasDescendants && heirs.father === 0 && heirs.paternal_grandfather === 0;
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

    let matGmActive = heirs.mother === 0 && heirs.maternal_grandmother > 0;
    let patGmActive = heirs.mother === 0 && heirs.paternal_grandmother > 0 && (selectedMadhab === 'hanbali' || heirs.father === 0);
    
    if (matGmActive && patGmActive) shares['Grandmothers (Shared)'] = 1 / 6;
    else if (matGmActive) shares['Maternal Grandmother'] = 1 / 6;
    else if (patGmActive) shares['Paternal Grandmother'] = 1 / 6;

    if (isMushtarakah) {
      let totalMushtarakah = heirs.maternal_siblings + heirs.full_brothers + heirs.full_sisters;
      shares['Maternal Siblings'] = (1 / 3) * (heirs.maternal_siblings / totalMushtarakah);
      shares['Full Brothers'] = (1 / 3) * ((heirs.full_brothers + heirs.full_sisters) / totalMushtarakah);
      specialRules['Maternal Siblings'] = 'mushtarakah'; specialRules['Full Brothers'] = 'mushtarakah';
    } else if (heirs.maternal_siblings > 0 && !hasDescendants && heirs.father === 0 && heirs.paternal_grandfather === 0) {
      shares['Maternal Siblings'] = heirs.maternal_siblings === 1 ? 1 / 6 : 1 / 3;
    }

    if (heirs.sons === 0) {
      if (heirs.daughters > 0) shares['Daughters'] = heirs.daughters === 1 ? 1 / 2 : 2 / 3;
      if (heirs.grandsons === 0 && heirs.granddaughters > 0) {
        if (heirs.daughters === 0) shares['Son\'s Daughters'] = heirs.granddaughters === 1 ? 1 / 2 : 2 / 3;
        else if (heirs.daughters === 1) shares['Son\'s Daughters'] = 1 / 6; 
      }
    }

    let activeBrothers = isMushtarakah ? 0 : heirs.full_brothers;
    let activeSisters = isMushtarakah ? 0 : heirs.full_sisters;
    let activePatBrothers = heirs.paternal_brothers;
    let activePatSisters = heirs.paternal_sisters;
    
    if (heirs.father > 0 || heirs.sons > 0 || heirs.grandsons > 0 || (heirs.paternal_grandfather > 0 && selectedMadhab === 'hanafi')) {
      activeBrothers = 0; activeSisters = 0; activePatBrothers = 0; activePatSisters = 0;
    }

    let fullSistersAsabah = activeSisters > 0 && activeBrothers === 0 && (heirs.daughters > 0 || heirs.granddaughters > 0);

    if (activeBrothers > 0 || fullSistersAsabah) {
      activePatBrothers = 0; activePatSisters = 0; 
    }

    let isMuqasamahCase = heirs.paternal_grandfather > 0 && heirs.father === 0 && selectedMadhab !== 'hanafi' && !hasDescendants && (activeBrothers + activeSisters + activePatBrothers + activePatSisters > 0);
    
    if (heirs.paternal_grandfather > 0 && heirs.father === 0 && !isMuqasamahCase) {
       shares['Paternal Grandfather'] = hasDescendants ? 1 / 6 : 0.0;
    }

    if (activeSisters > 0 && activeBrothers === 0 && !fullSistersAsabah && !isAkdariyyah && !isMuqasamahCase) {
      shares['Full Sisters'] = activeSisters === 1 ? 1 / 2 : 2 / 3;
      if (activeSisters >= 2) activePatSisters = 0; 
    }

    if (activePatSisters > 0 && activePatBrothers === 0 && heirs.daughters === 0 && heirs.granddaughters === 0 && !isMuqasamahCase) {
      if (activeSisters === 0) shares['Paternal Sisters'] = activePatSisters === 1 ? 1 / 2 : 2 / 3;
      else if (activeSisters === 1) shares['Paternal Sisters'] = 1 / 6; 
    }

    // --- AL-AWL ---
    let totalFixedShares = Object.values(shares).reduce((sum, val) => sum + val, 0.0);
    if (totalFixedShares > 1.0) {
      for (let key in shares) shares[key] = shares[key] / totalFixedShares;
      totalFixedShares = 1.0;
    }

    let remainingWealth = activeWealthFraction - (totalFixedShares * activeWealthFraction);

    // --- EXECUTE MUQASAMAH ---
    if (isMuqasamahCase && remainingWealth > 0.0001) {
      let sibParts = (activeBrothers * 2) + activeSisters + (activePatBrothers * 2) + activePatSisters;
      let gfParts = 2; 
      
      let muqasamahShare = remainingWealth * (gfParts / (gfParts + sibParts));
      let thirdOfRemainder = remainingWealth / 3;
      let sixthOfTotal = (1 / 6) * activeWealthFraction;
      
      let bestGfShare = Math.max(muqasamahShare, thirdOfRemainder, sixthOfTotal);
      if (bestGfShare > remainingWealth) bestGfShare = remainingWealth;
      
      shares['Paternal Grandfather'] = bestGfShare;
      specialRules['Paternal Grandfather'] = 'muqasamah';
      remainingWealth -= bestGfShare;
    }

    // --- RESIDUARIES (Ta'seeb) ---
    if (remainingWealth > 0.0001) {
      if (heirs.sons > 0) {
        let totalParts = (heirs.sons * 2) + heirs.daughters;
        let partValue = remainingWealth / totalParts;
        residues['Sons'] = partValue * 2 * heirs.sons;
        if (heirs.daughters > 0) residues['Daughters'] = partValue * heirs.daughters;
      } else if (heirs.grandsons > 0) {
        let totalParts = (heirs.grandsons * 2) + heirs.granddaughters;
        let partValue = remainingWealth / totalParts;
        residues['Son\'s Sons'] = partValue * 2 * heirs.grandsons;
        if (heirs.granddaughters > 0) residues['Son\'s Daughters'] = partValue * heirs.granddaughters;
      } else if (heirs.father > 0) {
        residues['Father'] = remainingWealth;
        if (isGharrawayn) specialRules['Father'] = 'gharrawayn';
      } else if (heirs.paternal_grandfather > 0 && !isMuqasamahCase) {
        residues['Paternal Grandfather'] = remainingWealth; 
      } else if (activeBrothers > 0) {
        let totalParts = (activeBrothers * 2) + activeSisters;
        let partValue = remainingWealth / totalParts;
        residues['Full Brothers'] = partValue * 2 * activeBrothers;
        if (activeSisters > 0) residues['Full Sisters'] = partValue * activeSisters;
      } else if (fullSistersAsabah) {
        residues['Full Sisters'] = remainingWealth; 
      } else if (activePatBrothers > 0) {
        let totalParts = (activePatBrothers * 2) + activePatSisters;
        let partValue = remainingWealth / totalParts;
        residues['Paternal Brothers'] = partValue * 2 * activePatBrothers;
        if (activePatSisters > 0) residues['Paternal Sisters'] = partValue * activePatSisters;
      } else if (activePatSisters > 0 && (heirs.daughters > 0 || heirs.granddaughters > 0)) {
        residues['Paternal Sisters'] = remainingWealth; 
      } else if (isMuqasamahCase && activeSisters > 0) {
         residues['Full Sisters'] = remainingWealth;
      }
    }

    // --- RADD LOOP ---
    if (remainingWealth > 0.0001 && heirs.sons === 0 && heirs.grandsons === 0 && heirs.father === 0 && heirs.paternal_grandfather === 0 && activeBrothers === 0 && activeSisters === 0 && activePatBrothers === 0 && activePatSisters === 0) {
      if (selectedMadhab === 'shafii' || selectedMadhab === 'maliki') {
        residues['Bayt al-Mal (Public Treasury)'] = remainingWealth;
      } else {
        let raddBase = 0.0;
        for (let key in shares) if (key !== 'Husband' && key !== 'Wives') raddBase += shares[key];
        if (raddBase > 0) {
          for (let key in shares) if (key !== 'Husband' && key !== 'Wives') shares[key] = shares[key] + (remainingWealth * (shares[key] / raddBase));
        } else residues['Bayt al-Mal (Public Treasury)'] = remainingWealth;
      }
    }
  }

  // 2. THIS SILENCES THE "POSSIBLY UNDEFINED" WARNING: A safe database fetcher.
  const defaultProof = {
    ruleTitle: "General Fara'id Distribution",
    quran: { arabic: "يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ", translation: "Allah commands you regarding your estate...", reference: "Al-Qur'an" },
    madhab: {
      shafii: { arabic: "...", translation: "Classical Rule", reference: "Al-Rahbiyyah" },
      hanafi: { arabic: "...", translation: "Classical Rule", reference: "Al-Sirajiyyah" },
      maliki: { arabic: "...", translation: "Classical Rule", reference: "Al-Jaybiyyah" },
      hanbali: { arabic: "...", translation: "Classical Rule", reference: "Nazm al-Mufradat" }
    }
  };

  const getSafeProof = (cat: string, sub: string) => {
    if (proofsDatabase[cat] && proofsDatabase[cat][sub]) {
      return proofsDatabase[cat][sub];
    }
    return defaultProof;
  };

  const getProofObj = (key: string, rule: string) => {
    if (rule === 'gharrawayn') return getSafeProof('complex_cases', 'gharrawayn');
    if (rule === 'akdariyyah') return getSafeProof('complex_cases', 'akdariyyah');
    if (rule === 'mushtarakah') return getSafeProof('complex_cases', 'mushtarakah');

    if (key.includes('Husband')) return hasDescendants ? getSafeProof('husband', 'quarter_share') : getSafeProof('husband', 'half_share');
    if (key.includes('Wives')) return hasDescendants ? getSafeProof('wives', 'eighth_share') : getSafeProof('wives', 'quarter_share');
    if (key.includes('Daughters')) return heirs.daughters > 1 ? getSafeProof('daughters', 'two_thirds_share') : getSafeProof('daughters', 'half_share');
    if (key.includes('Sons')) return getSafeProof('sons', 'asabah');
    if (key.includes('Mother')) return getSafeProof('mother', 'general');
    if (key.includes('Father')) return getSafeProof('father', 'general');
    if (key.includes('Full Brothers') || key.includes('Full Siblings')) return getSafeProof('full_brothers', 'general');
    if (key.includes('Full Sisters')) return getSafeProof('full_sisters', 'general');
    if (key.includes('Maternal')) return getSafeProof('maternal_siblings', 'general');
    if (key.includes('Paternal Grandfather')) return getSafeProof('father', 'general'); 
    if (key.includes('Paternal Grandmother')) return getSafeProof('paternal_grandmother', 'general');
    if (key.includes('Maternal Grandmother')) return getSafeProof('maternal_grandmother', 'general');
    if (key.includes('Grandmothers')) return getSafeProof('grandmothers_shared', 'general');
    if (key.includes('Son\'s Daughters')) return getSafeProof('granddaughters', 'general');
    if (key.includes('Paternal Brothers')) return getSafeProof('paternal_brothers', 'general');
    if (key.includes('Paternal Sisters')) return getSafeProof('paternal_sisters', 'general');

    return defaultProof;
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
      let displayName = specialRules[heirKey] === 'gharrawayn' ? `${heirKey} (Al-Gharrawayn)` : specialRules[heirKey] === 'akdariyyah' ? `${heirKey} (Al-Akdariyyah)` : specialRules[heirKey] === 'muqasamah' ? `${heirKey} (Best of Options)` : heirKey;
      let proof = getProofObj(heirKey, specialRules[heirKey] || '');

      results.push({ 
         name: displayName, 
         percentage: Number((val * 100).toFixed(2)), 
         amount: netAssetValue * val,  
         fraction: toFractionString(val),
         rule: proof.ruleTitle,
         quranProof: proof.quran,
         madhabProof: proof.madhab[selectedMadhab as keyof typeof proof.madhab] || proof.madhab.shafii
      });
    }
  }

  for (let [heirKey, val] of Object.entries(residues)) {
    if (val > 0) {
      let displayName = specialRules[heirKey] === 'gharrawayn' ? `${heirKey} (Al-Gharrawayn)` : heirKey;
      let proof = getProofObj(heirKey, specialRules[heirKey] || '');

      results.push({ 
         name: displayName, 
         percentage: Number((val * 100).toFixed(2)), 
         amount: netAssetValue * val,  
         fraction: 'Residuary (Asabah)', 
         rule: proof.ruleTitle,
         quranProof: proof.quran,
         madhabProof: proof.madhab[selectedMadhab as keyof typeof proof.madhab] || proof.madhab.shafii
      });
    }
  }

  return results.sort((a, b) => b.percentage - a.percentage);
}