import { decreaseDifference } from './math'

test(decreaseDifference.name, () => {
  expect(decreaseDifference(100, 200, 0.2)).toBeCloseTo(120)
  expect(decreaseDifference(100, 200, 0.5)).toBeCloseTo(150)
  expect(decreaseDifference(100, 200, 1)).toBeCloseTo(200)
  expect(decreaseDifference(100, 200, 2)).toBeCloseTo(200)
  expect(decreaseDifference(100, 200, 100000)).toBeCloseTo(200)

  expect(decreaseDifference(200, 100, 0.2)).toBeCloseTo(180)
  expect(decreaseDifference(200, 100, 0.5)).toBeCloseTo(150)
  expect(decreaseDifference(200, 100, 1)).toBeCloseTo(100)
  expect(decreaseDifference(200, 100, 2)).toBeCloseTo(100)
  expect(decreaseDifference(200, 100, 100000)).toBeCloseTo(100)
})
