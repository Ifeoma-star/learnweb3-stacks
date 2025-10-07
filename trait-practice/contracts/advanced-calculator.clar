;; title: advanced-calculator
;; version: 1.0.0
;; summary: A calculator implementing multiple traits with additional functions
;; description: Demonstrates implementing multiple traits and having extra functions beyond trait requirements

;; Implement the multiply function (required by multiplier trait)
(define-read-only (multiply
        (a uint)
        (b uint)
    )
    (ok (* a b))
)

;; Implement the divide function (required by divider trait)
(define-read-only (divide
        (a uint)
        (b uint)
    )
    (ok (/ a b))
)

;; Additional function - not required by any trait, but totally fine to have!
(define-read-only (subtract
        (a uint)
        (b uint)
    )
    (ok (- a b))
)

;; Additional function - add operation
(define-read-only (add
        (a uint)
        (b uint)
    )
    (ok (+ a b))
)

;; Assert that this contract implements both traits
(impl-trait .multiplier-trait.multiplier)
(impl-trait .divider-trait.divider)
