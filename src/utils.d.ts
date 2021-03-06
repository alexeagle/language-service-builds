/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CompileTypeMetadata } from '@angular/compiler';
import { ParseSourceSpan } from '@angular/compiler/src/parse_util';
import { SelectorInfo, TemplateInfo } from './common';
import { Span } from './types';
export interface SpanHolder {
    sourceSpan: ParseSourceSpan;
    endSourceSpan?: ParseSourceSpan;
    children?: SpanHolder[];
}
export declare function isParseSourceSpan(value: any): value is ParseSourceSpan;
export declare function spanOf(span?: SpanHolder | ParseSourceSpan): Span;
export declare function inSpan(position: number, span?: Span, exclusive?: boolean): boolean;
export declare function offsetSpan(span: Span, amount: number): Span;
export declare function isNarrower(spanA: Span, spanB: Span): boolean;
export declare function hasTemplateReference(type: CompileTypeMetadata): boolean;
export declare function getSelectors(info: TemplateInfo): SelectorInfo;
export declare function flatten<T>(a: T[][]): T[];
export declare function removeSuffix(value: string, suffix: string): string;
export declare function uniqueByName<T extends {
    name: string;
}>(elements: T[] | undefined): T[] | undefined;
