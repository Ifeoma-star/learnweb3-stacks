;; title: divider-trait
;; version: 1.0.0
;; summary: A trait that enforces a divide function
;; description: This trait defines the interface for contracts that can divide two numbers

;; Define the divider trait
;; Any contract implementing this trait must have a divide function
;; that takes two uints and returns a response with a uint or error
(define-trait divider (
    (divide
        (uint uint)
        (response uint uint)
    )
))
