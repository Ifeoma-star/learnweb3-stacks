;; title: multiplier-trait
;; version: 1.0.0
;; summary: A trait that enforces a multiply function
;; description: This trait defines the interface for contracts that can multiply two numbers

;; Define the multiplier trait
;; Any contract implementing this trait must have a multiply function
;; that takes two uints and returns a response with a uint or error
(define-trait multiplier
    (
        (multiply (uint uint) (response uint uint))
    )
)
