#!/bin/bash

current_branch=$(git branch --show-current 2>/dev/null || echo "main")
merge_branch=$(grep -oP "Merge branch '\K[^']+" "$1" 2>/dev/null || echo "feature")

echo "merge($current_branch): merge $merge_branch" > "$1"
