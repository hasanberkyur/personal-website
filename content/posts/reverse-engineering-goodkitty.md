---
title: Reverse Engineering “Good Kitty” CrackMe
date: 07-02-2026
tags:
  - reverse-engineering
  - crack-me
  - string-analysis
  - static-analysis
  - dynamic-analysis
  - ida
  - ghidra
  - gdb
  - gef
  - assembly
---

In this write-up, I will solve  the "[Emilia161](https://crackmes.one/user/Emilia161)'s good kitty" exercise to practice the **fundamentals of reverse engineering.**

My goal is to:

- Strengthen my **penetration testing fundamentals**
- Improve my understanding of **static vs dynamic analysis**
- Practice reading **assembly and decompiled code**
- Develop a structured reversing methodology

The crackme binary can be downloaded here:  
[https://crackmes.one/crackme/68c44e20224c0ec5dcedbf4b](https://crackmes.one/crackme/68c44e20224c0ec5dcedbf4b)

```bash
┌──(hasan㉿hasanslenovo)-[~/Projects/goodkitty]
└─$ ls crack
crack
```

---

# First Execution — “Bad Kitty” vs “Good Kitty”
When executing the program, it prompts the user for a password. Testing a few default passwords (e.g., *password*, *admin*) always resulted in "*bad kitty!*"

Example run:
```bash
┌──(hasan㉿hasanslenovo)-[~/Projects/goodkitty]
└─$ ./crack
enter the right password
password
bad kitty!
```

So the next logical step was to inspect the binary itself.

---

# String Analysis
To quickly identify embedded strings in the bytecodde, I used the **[strings](https://linux.die.net/man/1/strings)** utility:
```bash
┌──(hasan㉿hasanslenovo)-[~/Projects/goodkitty]
└─$ strings crack
```

Key observations:
- *puts*, *read*, *write* → Standard I/O functions
- *libc.so.6*, *libm.so.6* → Linked libraries
- *bad kitty!*, *good kitty!* → Program output states
- *factorial*, *ppeuler_3* → Likely password-generation logic

This strongly suggested that the password is **computed**, not hardcoded.

---

# Static Analysis
To understand the program’s logic, I loaded the binary into **[IDA](https://hex-rays.com/ida-free)** and analyzed the control flow graph.

The blue block corresponds to the *main* function.

![IDA Graph](/IDA_graph.pdf)

From the graph, we can observe that the program first calls *_read* to capture the user’s input from standard input. After the input is stored in memory, the program proceeds to compare the first **eight** characters of the provided string against an internally generated reference value. During this comparison process, a validation flag is maintained to track whether each character matches the expected sequence. Once the comparison is complete, the program evaluates this flag to determine the final result. If all checks succeed, it prints **“good kitty!”**; otherwise, it outputs **“bad kitty!”**. Based on this control flow, we can infer that the correct password must be exactly eight characters long.

## Decompiled Logic (via Ghidra)
To better understand semantics, I decompiled the binary using **Ghidra**, an Opern Source Project, and renamed variables for clarity:

```c
  write(1,&local_be,1);
  UserInputNewLine_Length = read(0,UserInput,0x40);
  UserInputLength = UserInputNewLine_Length + -1;
  isCorrect = 1;
  i = 0;
  if (0 < UserInputLength) {
     do {
        if (7 < i) break;
        if (UserInput[(int)i] != *(char *)((long)&Password + (long)(int)i)) {
           isCorrect = 0;
        }
        i = i + 1;
     } while ((int)i < UserInputLength);
  }
  isCorrect = UserInputLength == 8 & true;
  if (isCorrect == 0) {
     puts("bad kitty!");
  }
  else {
     puts("good kitty!");
  }
```

### Interpretation
- Compares first 8 input bytes
- Requires exact length = 8
- Sets validation flag accordingly
## Password Generation Logic
Looking further into the code:
```c
  Password = ppeuler_3();
  dVar3 = cbrt((double)Password);
  Password = (long)dVar3;
  Password = factorial(Password);
```

The password is not hardcoded but instead generated programmatically through a sequence of mathematical operations. First, the function *ppeuler_3()* is called to produce an initial value. This value is then transformed by taking its cube root, and the result is subsequently passed into a *factorial function* to produce the final password value used for comparison. At this stage, two possible solving approaches emerge: one could either recompute the password **mathematically** through static analysis by **replicating these operations**, or **extract the computed value dynamically from memory** during program execution. In this case, I chose to proceed with dynamic analysis.

---
# Dynamic Analysis
Dynamic analysis = analyzing the program **during execution**.

For this, I used **[gdb](gnu.org/savannah-checkouts/gnu/gdb/index.html)** debugger and its **[gef](https://github.com/hugsy/gef)** extension
```bash
┌──(hasan㉿hasanslenovo)-[~/Projects/goodkitty]
└─$ gdb ./crack
```

## Setting a Breakpoint
I wanted to inspect memory **right after input is read**:
```c
  UserInputNewLine_Length = read(0,UserInput,0x40);
  UserInputLength = UserInputNewLine_Length + -1; // <- The line we choose
```

Assembly equivalent:
```Assembly
000014bc 48 83 e8 01     SUB        UserInputLength,0x1    <- Same line in Bytecode
```

### Step 1 — Break at *main*
We need the Offset address and the start address of the main block. We calculate the address by adding the offset and the address of main:
```bash
gef➤  break main
Breakpoint 1 at 0x5555555552ac
```

### Step 2 — Identify memory layout
This shows the binary base address:
```bash
gef➤  vmmap
[ Legend:  Code | Stack | Heap ]
Start              End                Offset             Perm Path
0x0000555555554000 0x0000555555555000 0x0000000000000000 r-- /home/hasan/Projects/goodkitty/crack
0x0000555555555000 0x0000555555556000 0x0000000000001000 r-x /home/hasan/Projects/goodkitty/crack
0x0000555555556000 0x0000555555557000 0x0000000000002000 r-- /home/hasan/Projects/goodkitty/crack
0x0000555555557000 0x0000555555558000 0x0000000000002000 r-- /home/hasan/Projects/goodkitty/crack
...
```

### Step 3 — Calculate breakpoint address

- Offset: 0x14BC
- Base: 0x555555554000
- Final address: 0x000014BC + 0x555555554000 = 0x5555555554BC

Set breakpoint:
```bash
gef➤  break *0x5555555554BC
Breakpoint 1 at 0x5555555554BC
```

## Inspecting Stack Memory
When execution hit the breakpoint:
```bash
gef➤  context stack
0x00007fffffffdc00│+0x0000: 0x0000000000300000   ← $rsp
0x00007fffffffdc08│+0x0008: 0x00000000000a0000
0x00007fffffffdc10│+0x0010: 0x304d346f47733030
0x00007fffffffdc18│+0x0018: 0x64726f7773736170   ← $rbp
0x00007fffffffdc20│+0x0020: 0x6874207265746e65
0x00007fffffffdc28│+0x0028: 0x2074686769722065
0x00007fffffffdc30│+0x0030: 0x64726f7773736170
0x00007fffffffdc38│+0x0038: 0x0000000000000010
```

These values looked like ASCII.

## Converting Hex → String
```shell
gef➤  x/24s 0x00007fffffffdc08
0x7fffffffdc08: ""
0x7fffffffdc09: ""
0x7fffffffdc0a: "\n"
0x7fffffffdc0c: ""
0x7fffffffdc0d: ""
0x7fffffffdc0e: ""
0x7fffffffdc0f: ""
0x7fffffffdc10: "00sGo4M0passwordenter the right password\020"
...
```

We can clearly see:
- **Prompt** string
- Embedded **password**
- Stored sequentially in **stack memory**

The password is the 8-byte sequence before "password"
```shell
┌──(hasan㉿hasanslenovo)-[~/Projects/goodkitty]
└─$ ./crack
enter the right password
00sGo4M0
good kitty!
```

---

# Takeaways
This crackme provided a valuable opportunity to practice several **core reverse-engineering skills** in a hands-on context. Throughout the analysis, I worked on identifying meaningful **strings** within the binary, analyzing **static control flow** through graph views, and **reasoning about program logic** using decompiled output. I also refined my debugger workflow by selecting strategic **breakpoints and inspecting execution** state at critical moments.

Most importantly, this exercise demonstrated that dynamic analysis can expose computed secrets directly from memory, eliminating the need to manually solve the underlying mathematical operations.