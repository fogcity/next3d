---
sidebar_position: 1
---

# Get Started

Welcome to the Shit3D documentation (first release)!

Shit3D allows you to make beautiful, modern and fast mobile websites/apps, no matter what your design experience is, you will easily learn the most standardized component design and usage methods here. Components are built with React and Emotion, refer to IOS and Material design guidelines, and are inspired by Vuesax, Flutter.

## Installation

Inside your React project directory, install Shit3D by running either of the following:

```bash
npm install @s3d/core @emotion/reactt
```

## Setup

For Shit3D to work correctly, you need to set up the `App` at the root of your application (if not ,the components also show right).

Go to the root of your application and do this:

```bash
import * as React from 'react';

// 1. import `App` component
import { App } from '@s3d/core';

function Main({ Component }) {
  // 2. Use at the root of your app
  return (
    <App>
      <Component />
    </App>
  );
}
```

## Using Shit3D components

Once Shit3D is installed you can use any of the components as follows. Shit3D uses tree-shaking so the unused modules will not be included in the bundle during the build process and each component is exported separately.

```tsx
import { Button } from '@s3d/core';

const Component = () => <Button>Click me</Button>;
```

## Individual components import

```tsx
import Button from '@s3d/core';

const Component = () => <Button>Click me</Button>;
```

## App Props

| Attribute | Type   | Accepted values | Description | Default |
| --------- | ------ | --------------- | ----------- | ------- |
| 单元格    | 单元格 | 单元格          | 单元格      | 单元格  |
| 单元格    | 单元格 | 单元格          | 单元格      | 单元格  |
