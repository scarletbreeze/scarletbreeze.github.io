---
layout: post
title: Fuse- Image Basics
tag: web
---

참고자료
---

[오늘 본 동영상](https://www.youtube.com/watch?v=d5lA0yyq9g0&list=PLdlqWm6b-XALJgM3fGa4q95Yipsgb8Q1o&index=3)

[Trigger Class 공식 문서](https://www.fusetools.com/docs/fuse/triggers/trigger)

[Fuse 한글 비공식 문서](https://fanyhong.gitbooks.io/fuse_docs_kr/content/d_UX_Markup/04_Classes_uxClass.html)

## 1. Image Basics
 오늘은 이미지를 넣고, 레이아웃을 조정하는 방법에 대해서 배우겠다.
 
 
 
## 2 상대경로와 url
```
<Image File="Assets/text.png" />
<Imgae Url="" />

```
> 상대경로는 File="", Url="", 이렇게 잡아준다.

```
<App >
    <DockPanel>
        <StatusBarBackground Dock="Top" />
        <BottomBarBackground Dock="Bottom" />

        <Image File="Assets/test.png" StretchMode="Fill" />

    </DockPanel>
</App>

```
> StretchMode 안에 다양한 속성을 줌으로써 이미지 사이즈를 조정할 수 있다. fill은 가능한 만큼 꽉 채우게 하는 속성이다.
> [stretchmode 관련 공식자료](https://www.fusetools.com/docs/fuse/elements/stretchmode)
> Uniform, Fill pixelPrecise 등이 있으며 Uniform에서 StretchDirection을 지정해주어  uponly,downonly, Both와 같은 속성을 지정해 줄 수 있다.

## 3. Image tag

```
	<Image>
        <FileImageSource File="Assets/test.png"   />
    </Image>
        
    <Image>
        <HttpImageSource Url=""   />
    </Image>
```
> 이런 식으로 이미지 태그를 사용 가능, 위와 동일

```
<FileImageSource File="Assets/test.png" ux:Global="testpattern"  />

        <StackPanel>
            <Image Source="testpattern" />
            <Image Source="testpattern" />
        </StackPanel>
```
> 전역변수를 사용한 이 또한 위와 동일한 이미지륿 불러오는 태그, 이 경우 같은 이미지 2개를 불러왔다.

## 4. 이미지 사이즈 조정
```
 <Image Width="256" Height="128">
        <FileImageSource File="Assets/test.png"   />
    </Image>
```
> 이런 식으로 html태그를 사용하여 사이즈 조정 가능

```
<Image Width="256" Height="128">
        <MultiDensityImageSource>
        <FileImageSource File="Assets/test-256x128.png"  Density="1" />
        <FileImageSource File="Assets/test-512x256.png"  Density="2" />
        </MultiDensityImageSource>
</Image>
```
>이런 식으로 이미지 desnity를 주어 큰 화면에서는 크게, 작은 화면에서는 작게 보이게 할 수 있다.

## 5. 느낀점 
 image를 넣는게 생각보다 간단했다.
 density를 활용한 방법이 특이했다.