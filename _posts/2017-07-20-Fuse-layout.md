---

title: Fuse - Layout Basics
tag: web
---

## 1. Fuse 계정 가입, 다운

구글 멋사 계정으로 메일이 왔다. 그 링크를 타고 들어가서 가입했다. 그리고 그 사이트 들어가서 다운로드 했다.

[fuse 공식사이트 tutorial](https://www.fusetools.com/docs/tutorial/tutorial)

[시청한 동영상](https://www.youtube.com/watch?v=2kdXnX1SjzU&index=1&list=PLdlqWm6b-XALJgM3fGa4q95Yipsgb8Q1o)
## 2 앱 생성, preview
fuse 앱을 생성한다.
`
fuse create app hikr [optional path]
`

```$
tree
.
|- MainView.ux
|- hikr.unoproj

```
2개의 파일이 같이 생성된다. MainView.ux는 앱의 view ux code와 관련된 파일이다. hikr.unoproj 파일은 project settings 과 관련된 파일이다.

```
cd hikr
fuse preview
```

hikr 폴더에 들어가서 fuse preview를 하면, fuse가 실행된 화면을 볼 수 있다

`fuse install sublime-plugin`
> 서브라임에서 fuse에 관련 패키지들이 있으면 좋으니 설치해줬다.
> - Code completion
- Goto definition
- Preview your app from sublime
- Build result

## 3.Rectangle 
display를 설정하는 태그로, color property, css, layout 관련 설정이 가능하다.
`ex) <Rectangle Color="Blue" Width="100" Height="100" /> `

## 4. 느낀점

panel을 놓는 것, Orientation을 설정하는 것, text의 Alignment를 설정하는 것 등
자바에서 사용했던 GUI와 비슷했다. 

어떠한 패널이 있는지, html,css 문법 공부하듯 공부하면 되겠다.

*좋은 사이트 *
[fuse 시작하기 - doc 설명
](https://github.com/Hazealign/fuse-docs-kr/blob/master/Fuse/01%20-%20%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0.md)

