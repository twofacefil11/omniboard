#!/bin/bash

backup_branch="backup"

git checkout "$backup_branch"
git push origin "$backup_branch"
git checkout main

echo "Backup done, back to main"
