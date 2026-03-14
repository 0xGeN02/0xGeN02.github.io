---
title: "Timsort: the hybrid sorting algorithm Python relies on"
description: "Breaking down how Timsort combines merge sort and insertion sort to achieve O(n*log(n)) worst-case while exploiting natural runs in real-world data."
date: "6-8-2025"
tags: ["algorithms"]
language: "python"
draft: false
---

## What is Timsort?

Timsort is the default sorting algorithm in Python (`list.sort()`, `sorted()`) and Java's `Arrays.sort()` for objects. It was designed by Tim Peters in 2002 specifically for real-world data, which is rarely random — it usually has some existing order.

The key insight: **real data has runs**. A run is a sequence of already-sorted elements. Timsort finds these runs and merges them efficiently instead of sorting from scratch.

## The two building blocks

### Insertion sort for small chunks

For arrays smaller than a threshold (usually 32–64 elements), Timsort uses insertion sort. It's O(n^2) in theory, but for small n the constant factor is tiny — it has excellent cache locality and almost no overhead.

```python
def insertion_sort(arr, left, right):
    for i in range(left + 1, right + 1):
        key = arr[i]
        j = i - 1
        while j >= left and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
```

### Merge sort for combining runs

Once runs are identified (and extended to minimum size using insertion sort), Timsort merges them using a stack-based strategy. It maintains invariants on the run stack to keep merges balanced:

- `len(run[-3]) > len(run[-2]) + len(run[-1])`
- `len(run[-2]) > len(run[-1])`

This guarantees O(n*log(n)) in the worst case while achieving O(n) on already-sorted or nearly-sorted data.

## A simplified implementation

```python
MIN_MERGE = 32

def get_min_run(n):
    r = 0
    while n >= MIN_MERGE:
        r |= n & 1
        n >>= 1
    return n + r

def timsort(arr):
    n = len(arr)
    min_run = get_min_run(n)

    for start in range(0, n, min_run):
        end = min(start + min_run - 1, n - 1)
        insertion_sort(arr, start, end)

    size = min_run
    while size < n:
        for left in range(0, n, 2 * size):
            mid = min(n - 1, left + size - 1)
            right = min(left + 2 * size - 1, n - 1)
            if mid < right:
                merge(arr, left, mid, right)
        size *= 2
```

## Why it matters

On random data, Timsort is comparable to quicksort. But on the data we actually sort in practice — logs with timestamps, partially updated lists, database rows that were recently inserted — it's dramatically faster.

That's the lesson: the best algorithm isn't the one with the best worst-case, it's the one that exploits the structure of your actual input.
