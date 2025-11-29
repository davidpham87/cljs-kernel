// Copyright (c) JupyterLite Contributors
// Distributed under the terms of the Modified BSD License.

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import type { IKernel } from '@jupyterlite/services';

import { IKernelSpecs } from '@jupyterlite/services';

import { CljsKernel } from './kernel';

/**
 * A plugin to register the ClojureScript kernel.
 */
const kernel: JupyterFrontEndPlugin<void> = {
  id: '@jupyterlite/cljs-kernel:kernel',
  autoStart: true,
  requires: [IKernelSpecs],
  activate: (app: JupyterFrontEnd, kernelspecs: IKernelSpecs) => {
    kernelspecs.register({
      spec: {
        name: 'cljs',
        display_name: 'ClojureScript',
        language: 'clojure',
        argv: [],
        resources: {
          'logo-32x32': '',
          'logo-64x64': ''
        }
      },
      create: async (options: IKernel.IOptions): Promise<IKernel> => {
        return new CljsKernel(options);
      }
    });
  }
};

const plugins: JupyterFrontEndPlugin<any>[] = [kernel];

export default plugins;
