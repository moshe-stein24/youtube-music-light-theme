#!/usr/bin/env python3
"""
Simple GitHub deployment script for YouTube Music Light Theme Extension
"""

import os
import subprocess
import sys

# Configuration - UPDATED WITH YOUR VALUES
GITHUB_USERNAME = "moshe-stein24"  
YOUR_EMAIL = "moshestein24@gmail.com"  
REPO_NAME = "youtube-music-light-theme"

def run_cmd(cmd):
    """Run command and show output"""
    print(f"Running: {cmd}")
    result = subprocess.run(cmd, shell=True, text=True)
    if result.returncode != 0:
        print(f"❌ Command failed: {cmd}")
        return False
    return True

def update_files():
    """Replace placeholders in files"""
    files = ["manifest.json", "privacy-policy.html", "README.md"]
    
    for file in files:
        if os.path.exists(file):
            with open(file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            content = content.replace("YOUR_GITHUB_USERNAME", GITHUB_USERNAME)
            content = content.replace("YOUR_EMAIL_HERE@example.com", YOUR_EMAIL)
            content = content.replace("YOUR_EMAIL_HERE", YOUR_EMAIL.split('@')[0])
            
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Updated {file}")

def main():
    print("🎵 YouTube Music Light Theme - GitHub Deploy")
    print("=" * 45)
    
    # Check if in right directory
    if not os.path.exists("manifest.json"):
        print("❌ manifest.json not found! Run from extension folder.")
        sys.exit(1)
    
    print(f"📧 Email: {YOUR_EMAIL}")
    print(f"👤 GitHub: {GITHUB_USERNAME}")
    print(f"📦 Repository: {REPO_NAME}")
    
    # Confirm
    if input("Ready to deploy? (y/N): ").lower() != 'y':
        print("❌ Cancelled")
        sys.exit(0)
    
    # Update files
    update_files()
    
    # Git commands
    commands = [
        "git init",
        "git add .",
        f'git config user.email "{YOUR_EMAIL}"',
        f'git config user.name "{GITHUB_USERNAME}"',
        'git commit -m "Initial commit"',
        "git branch -M main",
        f"git remote set-url origin https://github.com/{GITHUB_USERNAME}/{REPO_NAME}.git || git remote add origin https://github.com/{GITHUB_USERNAME}/{REPO_NAME}.git",
        "git push -u origin main"
    ]
    
    print("\\n🚀 Deploying to GitHub...")
    for cmd in commands:
        if not run_cmd(cmd):
            print("\\n❌ Deployment failed!")
            print("\\nCommon fixes:")
            print("1. Create repository on GitHub first")
            print("2. Check Git is installed")
            print("3. Check GitHub credentials")
            sys.exit(1)
    
    print("\\n🎉 Success!")
    print(f"\\n📋 Next steps:")
    print(f"1. Go to: https://github.com/{GITHUB_USERNAME}/{REPO_NAME}/settings/pages")
    print(f"2. Enable GitHub Pages (main branch)")
    print(f"3. Privacy policy URL: https://{GITHUB_USERNAME}.github.io/{REPO_NAME}/privacy-policy.html")

if __name__ == "__main__":
    main()