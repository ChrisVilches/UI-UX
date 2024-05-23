import os
import subprocess
import shutil
import sys
import json

OUTPUT_DIR = "dist_all"

try:
    base_url = sys.argv[1]
except IndexError:
    base_url = ""

if not base_url:
    print("Base URL (first arg) cannot be empty")
    exit(1)

def is_app(path):
    return os.path.isdir(path) and 'vite.config.ts' in os.listdir(path)

def already_installed(app):
    return app in os.listdir(OUTPUT_DIR)

def app_url(app):
    return os.path.join(base_url, app)

def print_app_info_markdown(app):
    with open("./{}/package.json".format(app), "r") as f:
        data = json.load(f)

    name = data.get('name', app)
    desc = data.get('description', '')
    url = app_url(app)
    print("{} ([Demo]({}))".format(name, url))
    print(desc)
    print()
    print("TODO: Write descriptions on all applications")
    print("TODO: (HARD to implement) create a software that generates screenshots (inside a server using Docker with Puppeetter or something like that)")
    # TODO: Maybe one way to implement this is to create a microservice or a command (if the
    #       command is just one run of a self-removing docker container, then that'd be enough
    #       and compact... no need to open ports). Which gives the screenshot of a website.
    #       the screenshot shooting doesn't need to be in this script, it can be in a different
    #       deployment stage.

apps = [f for f in os.listdir() if is_app(f)]

if not os.path.exists(OUTPUT_DIR):
    os.mkdir(OUTPUT_DIR)

for app in apps:
    print("#################### Installing", app)
    if already_installed(app):
        print("Skipped")
        continue
    subprocess.call(["npm", "install"], cwd=app)
    subprocess.call(["npx", "tsc"], cwd=app)
    subprocess.call(["npx", "vite", "build", "--base={}".format(app_url(app))], cwd=app)
    source = "./{}/dist".format(app)
    dest = "./{}/{}".format(OUTPUT_DIR, app)
    shutil.move(source, dest, copy_function=shutil.copytree)

print()
print("Clean commands (execute manually):")
for app in apps:
    print("rm -rf ./{}/node_modules".format(app))

print()
print("Markdown information:")
for app in apps:
    print_app_info_markdown(app)
