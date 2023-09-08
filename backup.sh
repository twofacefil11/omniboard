#!/bin/bash

backup_branch="backup"

git checkout main
git branch "$backup"
git checkout "$backup"
git push origin "$backup"
git checkout main

echo "Backup done, back to main"
