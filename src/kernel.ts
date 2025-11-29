// Copyright (c) JupyterLite Contributors
// Distributed under the terms of the Modified BSD License.
import * as scittle from 'scittle/dist/scittle';

import type { KernelMessage } from '@jupyterlab/services';

import { BaseKernel } from '@jupyterlite/services';

/**
 * A kernel that evaluates ClojureScript.
 */
export class CljsKernel extends BaseKernel {
  /**
   * Handle a kernel_info_request message
   */
  async kernelInfoRequest(): Promise<KernelMessage.IInfoReplyMsg['content']> {
    const content: KernelMessage.IInfoReply = {
      implementation: 'ClojureScript',
      implementation_version: '0.1.0',
      language_info: {
        codemirror_mode: {
          name: 'clojure'
        },
        file_extension: '.cljs',
        mimetype: 'text/x-clojure',
        name: 'clojurescript',
        nbconvert_exporter: 'clojure',
        pygments_lexer: 'clojure',
        version: '1.0'
      },
      protocol_version: '5.3',
      status: 'ok',
      banner: 'A ClojureScript kernel running in the browser',
      help_links: [
        {
          text: 'ClojureScript Kernel',
          url: 'https://github.com/jupyterlite/cljs-kernel'
        }
      ]
    };
    return content;
  }

  /**
   * Handle an `execute_request` message
   *
   * @param msg The parent message.
   */
  async executeRequest(
    content: KernelMessage.IExecuteRequestMsg['content']
  ): Promise<KernelMessage.IExecuteReplyMsg['content']> {
    const { code } = content;

    this.publishExecuteResult({
      execution_count: this.executionCount,
      data: {
        'text/plain': scittle.core.eval_string(code)
      },
      metadata: {}
    });

    return {
      status: 'ok',
      execution_count: this.executionCount,
      user_expressions: {}
    };
  }

  /**
   * Handle an complete_request message
   *
   * @param msg The parent message.
   */
  async completeRequest(
    content: KernelMessage.ICompleteRequestMsg['content']
  ): Promise<KernelMessage.ICompleteReplyMsg['content']> {
    throw new Error('Not implemented');
  }

  /**
   * Handle an `inspect_request` message.
   *
   * @param content - The content of the request.
   *
   * @returns A promise that resolves with the response message.
   */
  async inspectRequest(
    content: KernelMessage.IInspectRequestMsg['content']
  ): Promise<KernelMessage.IInspectReplyMsg['content']> {
    throw new Error('Not implemented');
  }

  /**
   * Handle an `is_complete_request` message.
   *
   * @param content - The content of the request.
   *
   * @returns A promise that resolves with the response message.
   */
  async isCompleteRequest(
    content: KernelMessage.IIsCompleteRequestMsg['content']
  ): Promise<KernelMessage.IIsCompleteReplyMsg['content']> {
    throw new Error('Not implemented');
  }

  /**
   * Handle a `comm_info_request` message.
   *
   * @param content - The content of the request.
   *
   * @returns A promise that resolves with the response message.
   */
  async commInfoRequest(
    content: KernelMessage.ICommInfoRequestMsg['content']
  ): Promise<KernelMessage.ICommInfoReplyMsg['content']> {
    throw new Error('Not implemented');
  }

  /**
   * Send an `input_reply` message.
   *
   * @param content - The content of the reply.
   */
  inputReply(content: KernelMessage.IInputReplyMsg['content']): void {
    throw new Error('Not implemented');
  }

  /**
   * Send an `comm_open` message.
   *
   * @param msg - The comm_open message.
   */
  async commOpen(msg: KernelMessage.ICommOpenMsg): Promise<void> {
    throw new Error('Not implemented');
  }

  /**
   * Send an `comm_msg` message.
   *
   * @param msg - The comm_msg message.
   */
  async commMsg(msg: KernelMessage.ICommMsgMsg): Promise<void> {
    throw new Error('Not implemented');
  }

  /**
   * Send an `comm_close` message.
   *
   * @param close - The comm_close message.
   */
  async commClose(msg: KernelMessage.ICommCloseMsg): Promise<void> {
    throw new Error('Not implemented');
  }
}
