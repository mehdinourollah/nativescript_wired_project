import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'com.mehdi.articles',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  }
} as NativeScriptConfig;