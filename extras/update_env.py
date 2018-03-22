#!/usr/bin/env python2.7
"""
Updates index.html if there is a env.json file present.
Used to allow changing ember environment variables when it is
deployed as a docker container
"""
import json
import os
import os.path
import re
import shutil
import urllib

def update_ember_env(index_file, env_file):
    new_file = '/tmp/citron.html'
    with open(index_file, 'r') as source:
        data = source.read()
    with open(env_file, 'r') as source_env:
        updates = json.loads(source_env.read())

    expr = re.compile(r'(name="citron/config/environment" content=)"(.+?)"')
    encoded = urllib.quote(json.dumps(updates))
    with open(new_file, 'w') as target:
        print >> target, expr.sub(r'\1"{}"'.format(encoded), data)
    os.remove(index_file)
    print new_file, index_file
    shutil.move(new_file, index_file)


if __name__ == '__main__':
    citron_home = os.environ['CITRON_HOME']
    index_file = os.path.join(citron_home, 'dist', 'index.html')
    env_file = os.path.join(citron_home, 'dist', 'env.json')
    if citron_home:
        if all([os.path.exists(index_file), os.path.exists(env_file)]):
            update_ember_env(index_file, env_file)
