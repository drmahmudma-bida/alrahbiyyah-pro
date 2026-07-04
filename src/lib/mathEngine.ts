/**
 * THE AL-RAHBIYYAH FRAMEWORK - V7.1 (THE MASTERPIECE)
 * Complete Multi-Madhab Engine + Dynamic Muqasamah (Grandfather vs. Siblings)
 */

export function calculateUltimateRahbiyyah(heirs: any, selectedMadhab: string = 'shafii', netAssetValue: number = 100000) {
  if (heirs.husband > 0 && heirs.wives > 0) return [{ heir: 'Error', percentage: 100, fraction: 'N/A', rule: 'invalid_spouses' }];

  let reservedAmount = 0.0;
  let reserveFraction = 0.0;
  let results = [];
  
  if (heirs.unborn_foetus > 0) {
    if (selectedMadhab === 'maliki') return [{ heir: 'Unborn Foetus Escrow', percentage: 100, fraction: 'Distribution Frozen (Maliki)', rule: 'maliki_freeze' }];
    if (selectedMadhab === 'shafii') reserveFraction = 0.60; 
    else if (selectedMadhab === 'hanbali') reserveFraction = 0.40; 
    else if (selectedMadhab === 'hanafi') reserveFraction = 0.25; 
    reservedAmount = netAssetValue * reserveFraction;
    results.push({ heir: 'Unborn Foetus Escrow', percentage: reserveFraction * 100, fraction: 'Reserved', rule: 'foetus_escrow' });
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
      shares['Maternal Siblings (Mushtarakah)'] = (1 / 3) * (heirs.maternal_siblings / totalMushtarakah);
      shares['Full Siblings (Mushtarakah)'] = (1 / 3) * ((heirs.full_brothers + heirs.full_sisters) / totalMushtarakah);
      specialRules['Maternal Siblings (Mushtarakah)'] = 'mushtarakah'; specialRules['Full Siblings (Mushtarakah)'] = 'mushtarakah';
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

    // THE MUQASAMAH ENGINE (Grandfather vs Siblings)
    let isMuqasamahCase = heirs.paternal_grandfather > 0 && heirs.father === 0 && selectedMadhab !== 'hanafi' && !hasDescendants && (activeBrothers + activeSisters + activePatBrothers + activePatSisters > 0);
    
    // Normal Grandfather Fixed Share (if no siblings or if Hanafi or if has descendants)
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
      let gfParts = 2; // Grandfather acts as a brother
      
      let muqasamahShare = remainingWealth * (gfParts / (gfParts + sibParts));
      let thirdOfRemainder = remainingWealth / 3;
      let sixthOfTotal = (1 / 6) * activeWealthFraction;
      
      let bestGfShare = Math.max(muqasamahShare, thirdOfRemainder, sixthOfTotal);
      
      if (bestGfShare > remainingWealth) bestGfShare = remainingWealth; // Prevent mathematical overflow
      
      shares['Paternal Grandfather'] = bestGfShare;
      specialRules['Paternal Grandfather'] = 'muqasamah'; // Tags it for the UI
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
         // Edge case: Grandfather took his share, but only sisters remain. They get standard Ta'seeb of remainder.
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

  // FORMAT OUTPUT
  for (let [heir, val] of Object.entries(shares)) {
    if (val > 0) {
      let displayName = specialRules[heir] === 'gharrawayn' ? `${heir} (Al-Gharrawayn)` : specialRules[heir] === 'akdariyyah' ? `${heir} (Al-Akdariyyah)` : specialRules[heir] === 'muqasamah' ? `${heir} (Best of Options)` : heir;
      results.push({ heir: displayName, lookupKey: specialRules[heir] === 'muqasamah' ? 'Paternal Grandfather' : specialRules[heir] || heir, percentage: Number((val * 100).toFixed(2)), fraction: specialRules[heir] ? 'Special Case' : 'Fixed Share' });
    }
  }
  for (let [heir, val] of Object.entries(residues)) {
    if (val > 0) {
      let displayName = specialRules[heir] === 'gharrawayn' ? `${heir} (Al-Gharrawayn)` : heir;
      results.push({ heir: displayName, lookupKey: specialRules[heir] || heir, percentage: Number((val * 100).toFixed(2)), fraction: specialRules[heir] ? 'Special Case' : 'Residuary' });
    }
  }

  return results.sort((a, b) => b.percentage - a.percentage);
}