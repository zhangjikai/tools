#!/usr/bin/env python
# -*- coding:utf-8 -*-
import os
import codecs
import sys
import getopt

__author__ = 'zhangjk'


def main(argv):
    input_dir = ""
    output_dir = ""
    input_encode = "gbk"
    output_encode = "utf-8"

    try:
        opts, args = getopt.getopt(argv, "hi:o:e:d:")
    except getopt.GetoptError:
        print "encoding.py -i <input_dir> -o <output_dir> -e <input_file_encoding> -d <output_file_encoding>"
        sys.exit(2)

    if not len(opts):
        print "encoding.py -i <input_dir> -o <output_dir> -e <input_file_encoding> -d <output_file_encoding>"
        sys.exit(2)

    for opt, arg in opts:
        if opt == '-h':
            print "encoding.py -i <input_dir> -o <output_dir> -e <input_file_encoding> -d <output_file_encoding>"
            sys.exit()
        elif opt == '-i':
            input_dir = arg
        elif opt == '-o':
            output_dir = arg
        elif opt == '-e':
            input_encode = arg
        elif opt == '-d':
            output_encode = arg

    if input_dir == '' or output_dir == '':
        print "encoding.py -i <input_dir> -o <output_dir> -e <input_file_encoding> -d <output_file_encoding>"
        sys.exit()

    folder_transfer(input_dir, output_dir, input_encode, output_encode)


def folder_transfer(input_root, output_root, input_encode, output_encode):
    for file_name in os.listdir(input_root):
        path = os.path.join(input_root, file_name)
        output_path = os.path.join(output_root, file_name)
        is_exist = os.path.exists(output_root)
        if not is_exist:
            os.makedirs(output_root)
        if os.path.isdir(path):
            folder_transfer(path, output_path, input_encode, output_encode)
        else:
            input_file = codecs.open(path, "r", input_encode)
            output_file = codecs.open(output_path, "w", output_encode)
            output_file.write(input_file.read())
            input_file.close()
            output_file.close()


if __name__ == '__main__':
    main(sys.argv[1:])