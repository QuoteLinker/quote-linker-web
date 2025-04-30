interface InsuranceTip {
  text: string;
  source: string;
}

interface TipCollection {
  [key: string]: InsuranceTip[];
}

export const insuranceTips: TipCollection = {
  life: [
    {
      text: 'Term life insurance is generally more affordable and ideal for covering temporary needs like raising kids or paying off a mortgage.',
      source: 'NAIC',
    },
    {
      text: 'A good rule of thumb is to have life insurance coverage equal to 10-15 times your annual income.',
      source: 'Insurance Information Institute',
    },
    {
      text: "Consider buying life insurance when you're young and healthy - premiums are typically lower and approval is easier.",
      source: 'NAIC',
    },
  ],
  auto: [
    {
      text: 'Bundling your auto insurance with home or renters insurance can save you up to 15% on both policies.',
      source: 'Insurance Information Institute',
    },
    {
      text: 'Higher deductibles usually mean lower premiums. Consider your emergency savings when choosing a deductible.',
      source: 'NAIC',
    },
    {
      text: 'Many insurers offer discounts for safety features like anti-lock brakes, airbags, and anti-theft devices.',
      source: 'Insurance Information Institute',
    },
  ],
  home: [
    {
      text: "Standard home insurance doesn't cover flood damage. Consider separate flood insurance if you're in a risk area.",
      source: 'FEMA',
    },
    {
      text: 'Maintaining good credit can help lower your home insurance premiums in most states.',
      source: 'Insurance Information Institute',
    },
    {
      text: 'Installing security systems and smoke detectors can qualify you for insurance discounts while protecting your home.',
      source: 'NAIC',
    },
  ],
  health: [
    {
      text: 'High-deductible health plans often qualify for Health Savings Accounts (HSAs), offering tax advantages.',
      source: 'Healthcare.gov',
    },
    {
      text: 'Preventive care is typically covered 100% by insurance plans, with no out-of-pocket cost.',
      source: 'Healthcare.gov',
    },
    {
      text: 'Check if your preferred doctors are in-network before choosing a health plan to avoid higher costs.',
      source: 'NAIC',
    },
  ],
  disability: [
    {
      text: 'Short-term disability typically covers 3-6 months, while long-term disability can last several years or until retirement.',
      source: 'Insurance Information Institute',
    },
    {
      text: 'Group disability insurance through employers often covers 60% of your base salary.',
      source: 'NAIC',
    },
    {
      text: "Consider an 'own occupation' policy if you have a specialized career - it provides coverage if you can't do your specific job.",
      source: 'Insurance Information Institute',
    },
  ],
};
