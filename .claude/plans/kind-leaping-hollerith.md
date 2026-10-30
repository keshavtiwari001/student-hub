---
name: college-fee-calculator-annual-dropdown
description: Add annually fee calculator based on a dropdown in College Fee Calculator
---

# Plan: Add annually fee calculator to College Fee Calculator

## Context
The user wants the College Fee Calculator to have an annually fee calculator based on a dropdown. This will allow users to calculate fees based on either semesterly or annual expenses.

## Implementation Approach
1. Add a `feeCalculationMode` state in `app/calculators/college-fee/page.jsx` (default: 'semester').
2. Add a `SelectField` to the form to allow users to toggle between 'Semester' and 'Annually'.
3. Based on the selected mode, update the labels of the input fields (e.g., "Tuition Fee per Semester" vs "Tuition Fee per Year").
4. Update the `handleCalculate` logic:
   - If 'semester' is selected, continue existing calculation.
   - If 'annually' is selected, treat the inputs as annual costs, and adjust the intermediate calculations (e.g., divide annual costs by `semestersPerYear` to get semester costs).
5. Ensure the results section correctly updates based on the selected mode.

## Critical Files
- `app/calculators/college-fee/page.jsx`

## Verification
1. Run the calculator and select 'Semester'. Verify outputs match current behavior.
2. Select 'Annually'. Enter some values and verify that the calculated annual cost matches the inputs, and the total degree cost is correctly scaled by years.
3. Reset and ensure the dropdown returns to its default state.
