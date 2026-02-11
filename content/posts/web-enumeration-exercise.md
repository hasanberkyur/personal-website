---
title: "Web Enumeratin: Practical Exercise"
type: "note"
date: "2026-02-11"
tags:
  - penetration-testing
  - web-enumeration
  - gobuster
  - wordpress
  - curl
  - robots
  - whatweb
  - source-code
---
# HTB: Very Short CTF about Web Enumeration
**Target:** *154.57.164.77:31323*  
**Goal:** Perform basic web enumeration and retrieve the secret flag.

# 1) Check the Website
**First step** in any web challenge: **visit** the target in the browser.

The page loads successfully and looks minimal. Always inspect the page source:
- Right click → View Page Source
- Look for comments
- Look for hidden links
- Look for suspicious paths

In this case, the source code was clean.

![Web Site](/web-enumeration-exercise/website.png)

Next, check the web server information. We identify the web server from the banner.

![Extracting the Web Server Header](/web-enumeration-exercise/banner.png)

This gives us additional context about the backend technology.

# 2) Directort/File Enumeration
Now we move to active enumeration.

We use **gobuster** for directory brute-forcing:

![Gobusters](/web-enumeration-exercise/gobusters.png)

We discover:
- */robots.txt*
- */wordpress*

These are interesting.

> **Note:** Be careful when running enumeration from university or ISP networks.  
> High request rates may trigger monitoring systems. I was blocked once while enumerating my own website.

# 3) Wordpress
Visiting */wordpress* reveals a WordPress installation. However, the setup is incomplete or not configured.

![Wordpress](/web-enumeration-exercise/wordpress.png)

If the setup page is publicly accessible, we can complete the installation ourselves and create an administrator account.

Once logged in to */wp-admin*, we can modify theme files or upload a malicious plugin, leading to **Remote Code Execution (RCE)** on the server.

But unfortunatelly the setup page was just a dummy website that doest function at all.

# 4) Robots.txt
The file */robots.txt* is publicly accessible.

**robots.txt** is used to tell search engines which paths should not be indexed.

However, in CTFs, it often contains hidden directories.

![robot.txt](/web-enumeration-exercise/robots.png)

Inside *robots.txt*, we find the disallowed path "*/admin-login-page.php*"

# 5) Admin Page
Following the path from robots.txt leads us to an admin page.

We try some common default credentials:
- admin / admin
- admin / password
- root / root
- test / test

Inside the page source, we find a comment left by the developer.

![Examine the Source Code](/web-enumeration-exercise/source-code.png)

The comment contains credentials. We use them to log in.

![Admin Login Page](/web-enumeration-exercise/admin-panel.png)

After logging in, we access the restricted area and retrieve the **flag**.

![Flag](/web-enumeration-exercise/flag.png)

# Key Takeaways
- Always check **source** code
- Always check **robots.txt**
- **Directory enumeration** is essential
- **Misconfigured** admin pages are common in CTFs
- **Comments** in source code often leak **credentials**
- Rate limiting is real — **be careful when scanning**
