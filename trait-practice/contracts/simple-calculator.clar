;; title: simple-calculator
;; version: 1.0.0
;; summary: A calculator that implements the multiplier trait
;; description: This contract demonstrates implementing a trait by providing a multiply function

;; Implement the multiply function as required by the multiplier trait
(define-read-only (multiply
        (a uint)
        (b uint)
    )
    (ok (* a b))
)

;; Assert that this contract implements the multiplier trait
;; Note: In a real deployment, replace the principal with the actual deployed trait address
(impl-trait .multiplier-trait.multiplier)
