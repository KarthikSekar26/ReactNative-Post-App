import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Navigator, Text, View, ActivityIndicator } from 'react-native';

/*       The Actual Component which is to be loaded initally has been moved to a separate Component - 'PostProject'; 
         So that it can be reused for Android and iOS (Code Reusability)    */

import PostProject from './src/index';

AppRegistry.registerComponent('PostProject', () => PostProject);
