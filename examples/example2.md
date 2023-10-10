
# example 2

```mermaid
flowchart LR
    R1 --- R2
    R2 --- c1{ }
    c1-- Success --- R3
    c1-- Failure --- R5
    R3 --- R4
    R5 --- R6
```