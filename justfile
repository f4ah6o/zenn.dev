# zenn.dev manage articles/books Commands

help:
    pnpx zenn-cli --help

sync:
    node scripts/mbt-sync.js

new:
    pnpx zenn-cli new:article

book:
    pnpx zenn-cli new:book

list:
    pnpx zenn-cli list:articles

books:
    pnpx zenn-cli list:books

dev:
    pnpx zenn-cli preview --open

preview: dev
