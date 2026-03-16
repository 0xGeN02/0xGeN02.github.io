---
title: "Timsort: the hybrid sorting algorithm Python relies on"
description: "Breaking down how Timsort combines merge sort and insertion sort to achieve O(n*log(n)) worst-case while exploiting natural runs in real-world data."
date: "08-06-2025"
tags: ["algorithms"]
language: ["Python"]
draft: false
---

## What is Timsort?

Timsort is the default sorting algorithm in Python (`list.sort()`, `sorted()`) and Java's `Arrays.sort()` for objects. It was designed by Tim Peters in 2002 specifically for real-world data, which is rarely random — it usually has some existing order.

The key insight: **real data has runs**. A run is a maximal sequence of already-sorted (or reverse-sorted) elements. Timsort finds these runs and merges them efficiently instead of sorting from scratch. On a fully sorted array it runs in O(n) — it just detects one big run and stops.

## The two building blocks

### Insertion sort for small chunks

For arrays smaller than a threshold (usually 32–64 elements), Timsort uses insertion sort. It's O(n²) in theory, but for small `n` the constant factor is tiny — it has excellent cache locality, no recursion overhead, and is adaptive (nearly sorted input is almost free).

```python
def insertion_sort(arr: list, left: int, right: int) -> None:
    for i in range(left + 1, right + 1):
        key = arr[i]
        j = i - 1
        while j >= left and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
```

### Merging two sorted runs

Once runs are collected, Timsort merges adjacent pairs using a standard two-pointer merge. This is the O(n) step that combines already-sorted halves:

```python
def merge(arr: list, left: int, mid: int, right: int) -> None:
    left_part = arr[left : mid + 1]
    right_part = arr[mid + 1 : right + 1]

    i = j = 0
    k = left

    while i < len(left_part) and j < len(right_part):
        if left_part[i] <= right_part[j]:
            arr[k] = left_part[i]
            i += 1
        else:
            arr[k] = right_part[j]
            j += 1
        k += 1

    while i < len(left_part):
        arr[k] = left_part[i]
        i += 1
        k += 1

    while j < len(right_part):
        arr[k] = right_part[j]
        j += 1
        k += 1
```

Note the `<=` on the comparison — this makes Timsort **stable**, meaning equal elements preserve their original order. That's a hard requirement for Python's sort.

## Computing the minimum run size

Before sorting, Timsort computes a `min_run` value — the minimum length a run must reach before it's pushed onto the merge stack. The goal is to pick a value between 32 and 64 such that `n / min_run` is close to a power of two, which keeps merges balanced.

```python
MIN_MERGE = 32

def get_min_run(n: int) -> int:
    r = 0
    while n >= MIN_MERGE:
        r |= n & 1   # set r=1 if any shifted-out bit is 1
        n >>= 1      # halve n
    return n + r
```

The `r |= n & 1` line tracks whether any bits were lost during the right shifts. If so, it rounds up the result by 1. This ensures `n / min_run` is never slightly above a power of two, which would waste a merge pass.

## Full implementation

```python
def timsort(arr: list) -> None:
    n = len(arr)
    min_run = get_min_run(n)

    # Step 1 — sort small slices with insertion sort
    for start in range(0, n, min_run):
        end = min(start + min_run - 1, n - 1)
        insertion_sort(arr, start, end)

    # Step 2 — merge sorted slices, doubling the window each pass
    size = min_run
    while size < n:
        for left in range(0, n, 2 * size):
            mid = min(n - 1, left + size - 1)
            right = min(left + 2 * size - 1, n - 1)
            if mid < right:
                merge(arr, left, mid, right)
        size *= 2
```

## Tracing through an example

Take `arr = [5, 3, 1, 4, 2]` with `min_run = 2` for illustration.

**Step 1 — insertion sort each slice:**

| Slice | Before | After |
|-------|--------|-------|
| `[0:1]` | `[5, 3]` | `[3, 5]` |
| `[2:3]` | `[1, 4]` | `[1, 4]` |
| `[4:4]` | `[2]` | `[2]` |

Array after step 1: `[3, 5, 1, 4, 2]`

**Step 2 — merge passes:**

- Pass 1 (`size=2`): merge `[3,5]` + `[1,4]` → `[1,3,4,5]`, leave `[2]` alone
- Pass 2 (`size=4`): merge `[1,3,4,5]` + `[2]` → `[1,2,3,4,5]`

## Complexity

| Case | Time | Notes |
|------|------|-------|
| Best | O(n) | Input already sorted — one run detected |
| Average | O(n log n) | Typical random data |
| Worst | O(n log n) | Guaranteed by balanced merge invariants |
| Space | O(n) | Temporary arrays during merge |

The real-world performance on nearly-sorted data is what makes Timsort stand out. CPython's `list.sort()` is hard to beat in practice because most lists you sort in an application aren't random.

## Why it matters

On random data, Timsort is comparable to quicksort. But on the data we actually sort in practice — logs with timestamps, partially updated lists, database rows sorted by a different column — it's dramatically faster because it detects and exploits existing structure.

The broader lesson: the best algorithm isn't always the one with the best worst-case on paper. It's the one that matches the distribution of your actual input. Tim Peters designed Timsort by looking at real Python programs, not textbook examples — and that's why it's still the default 20 years later.
