---
title: 文件处理
---

## 验证文件类型

```ts
/**
 * 验证文件类型
 * @param fileName 文件名（包含后缀）
 * @param acceptList 支持的文件类型列表（文件后缀列表）
 * @returns boolean
 */
export function validateFileType(fileName: string, acceptList: string[]): boolean {
  const fileSuffix = fileName.substring(fileName.lastIndexOf('.'));
  return acceptList.includes(fileSuffix);
}
```

## 验证图片尺寸（图片宽高）

```ts
import type { UploadRawFile } from 'element-plus';

/**
 * 验证图片尺寸（图片宽高）
 * @param fileRaw 图片文件的 Raw 数据
 * @param width 图片宽度
 * @param height 图片高度
 * @returns Promise<boolean>
 */
export function validateImageSize(
  fileRaw: UploadRawFile, { width, height }: { width: number; height: number }
): Promise<boolean> {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(fileRaw);
    fileReader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const isValid = img.width === width && img.height === height;
        resolve(isValid);
      };
    };
  });
}
```