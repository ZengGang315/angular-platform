/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injectable as _Injectable, Pipe as _Pipe, PipeTransform, ɵɵdefineInjectable, ɵɵdefinePipe, ɵɵgetInheritedFactory, ɵɵinject} from '@angular/core';
import {expect} from '@angular/platform-browser/testing/src/matchers';

import {ɵɵtext, ɵɵtextInterpolate1} from '../../src/render3/instructions/all';
import {ɵɵpipe, ɵɵpipeBind1} from '../../src/render3/pipe';

import {TemplateFixture} from './render_util';

const Pipe: typeof _Pipe = function(...args: any[]): any {
  // In test we use @Pipe for documentation only so it's safe to mock out the implementation.
  return () => undefined;
} as any;

const Injectable: typeof _Injectable = function(...args: any[]): any {
  // In test we use @Injectable for documentation only so it's safe to mock out the implementation.
  return () => undefined;
} as any;


describe('pipe', () => {
  // This test isn't in `acceptance`, because we can't capture the same behavior that we want
  // when going through `TestBed`. Here we're testing the behavior of AOT-compiled code which
  // differs from the JIT code in `TestBed`, because it includes a `ɵɵgetInheritedFactory` call
  // when the pipe is using inheritance.
  it('should be able to use DI in a Pipe that extends an Injectable', () => {
    @Injectable({providedIn: 'root'})
    class SayHelloService {
      getHello() {
        return 'Hello there';
      }
      static ɵfac = () => new SayHelloService();
      static ɵprov = ɵɵdefineInjectable(
          {token: SayHelloService, factory: SayHelloService.ɵfac, providedIn: 'root'});
    }

    @Injectable()
    class ParentPipe {
      constructor(protected sayHelloService: SayHelloService) {}
      static ɵfac = (t?: any) => new(t || ParentPipe)(ɵɵinject(SayHelloService));
      static ɵprov = ɵɵdefineInjectable({token: ParentPipe, factory: ParentPipe.ɵfac});
    }

    @Pipe({name: 'sayHello', pure: true})
    class SayHelloPipe extends ParentPipe implements PipeTransform {
      transform() {
        return this.sayHelloService.getHello();
      }
      static override ɵfac = (t?: any) => ɵɵgetInheritedFactory(t || SayHelloPipe)(SayHelloPipe);
      static ɵpipe = ɵɵdefinePipe({name: 'sayHello', type: SayHelloPipe, pure: true});
    }

    const fixture = new TemplateFixture({
      create: () => {
        ɵɵtext(0);
        ɵɵpipe(1, 'sayHello');
      },
      update: () => {
        ɵɵtextInterpolate1('', ɵɵpipeBind1(1, 1, null), '');
      },
      decls: 2,
      vars: 3,
      pipes: [SayHelloPipe]
    });

    expect(fixture.html).toBe('Hello there');
  });
});
