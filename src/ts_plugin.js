/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as ts from 'typescript';
import { createLanguageService } from './language_service';
import { TypeScriptServiceHost } from './typescript_host';
/** A plugin to TypeScript's langauge service that provide language services for
 * templates in string literals.
 *
 * @experimental
 */
export class LanguageServicePlugin {
    constructor(config) {
        this.host = config.host;
        this.serviceHost = new TypeScriptServiceHost(config.host, config.service);
        this.service = createLanguageService(this.serviceHost);
        this.serviceHost.setSite(this.service);
    }
    /**
     * Augment the diagnostics reported by TypeScript with errors from the templates in string
     * literals.
     */
    getSemanticDiagnosticsFilter(fileName, previous) {
        let errors = this.service.getDiagnostics(fileName);
        if (errors && errors.length) {
            let file = this.serviceHost.getSourceFile(fileName);
            for (const error of errors) {
                previous.push({
                    file,
                    start: error.span.start,
                    length: error.span.end - error.span.start,
                    messageText: error.message,
                    category: ts.DiagnosticCategory.Error,
                    code: 0
                });
            }
        }
        return previous;
    }
    /**
     * Get completions for angular templates if one is at the given position.
     */
    getCompletionsAtPosition(fileName, position) {
        let result = this.service.getCompletionsAt(fileName, position);
        if (result) {
            return {
                isMemberCompletion: false,
                isNewIdentifierLocation: false,
                entries: result.map(entry => ({ name: entry.name, kind: entry.kind, kindModifiers: '', sortText: entry.sort }))
            };
        }
    }
}
LanguageServicePlugin['extension-kind'] = 'language-service';
//# sourceMappingURL=ts_plugin.js.map