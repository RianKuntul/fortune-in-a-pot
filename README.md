# Fortune in a Pot

[![Competition](https://make.fun/badge/u-golden-heron-44-fortune-in-a-pot-ded981e9.svg)](https://make.fun/c/u-golden-heron-44-fortune-in-a-pot-ded981e9)
[![Rank](https://make.fun/badge/u-golden-heron-44-fortune-in-a-pot-ded981e9/RianKuntul/fortune-in-a-pot/rank.svg)](https://make.fun/c/u-golden-heron-44-fortune-in-a-pot-ded981e9)
[![Reward](https://make.fun/badge/u-golden-heron-44-fortune-in-a-pot-ded981e9/RianKuntul/fortune-in-a-pot/reward.svg)](https://make.fun/c/u-golden-heron-44-fortune-in-a-pot-ded981e9)

A tiny Node program that writes one kind, funny fortune for a houseplant —
a single line of at most 120 characters, told to the plant on the windowsill
about its own leafy future.

## The line

> You will lean so far toward the sun that your keeper turns your pot, and you will brag to the fern about your holiday.

## How it works

`main.ts` (Node 22, standard library only) composes the fortune from three
beats — the plant's lean toward the sun, the keeper's pot turn, and the
plant's verdict on it — then writes the line to `entry.txt` in the output
directory (`$MAKEFUN_OUTPUT_DIR`, or `/output` by default). It reads the
file back and throws if the text is outside the gate of 1 to 120
characters, is only whitespace, or spans more than one line.

Run it with:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
```

---

Built for [make.fun](https://make.fun).
