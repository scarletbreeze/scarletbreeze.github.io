---

title: Fuse- Triggers and Animation
tag: web
---

참고자료
---

[오늘 본 동영상](https://www.youtube.com/watch?v=bT1npBvXEzw&index=2&list=PLdlqWm6b-XALJgM3fGa4q95Yipsgb8Q1o)

[Trigger Class 공식 문서](https://www.fusetools.com/docs/fuse/triggers/trigger)

[Fuse 한글 비공식 문서](https://fanyhong.gitbooks.io/fuse_docs_kr/content/d_UX_Markup/04_Classes_uxClass.html)

## 1. Triggers and Animation
Trigger는 UX 마크업에 사용되는 객체다.

Trigger는 UX 마크업에서 네 가지 자식 노드 타입을 가질 수 있다.
Animators/Actions/Nodes/Resources

## 2 실습
```
<App >
    <DockPanel>
        <StatusBarBackground DockPanel.Dock="Top" />

        <Rectangle Width="100" Height="100" Fill="#000" CornerRadius="10">
            <WhilePressed>
                <Scale Factor="1.5"/>
            </WhilePressed>
        </Rectangle>
    </DockPanel>
</App>

```
> Rectangle > WhilePressed > Scale을 해줌으로써 scale의 Factor 값에 맞게, 클릭 했을 때 사각형의 크기가 변한다.

```
<App >
    <DockPanel>
        <StatusBarBackground DockPanel.Dock="Top" />

        <StackPanel Orientation="Horizontal" Alignment="Center">
            <Rectangle TransformOrigin="TopLeft" Width="100" Height="100" Fill="#000" CornerRadius="10">
                <WhilePressed>
                    <Scale Target="GreyRectangle" Factor="1.5" Duration="0.1" Easing="BounceOut" EasingBack="BounceIn" DurationBack=".5" />
                    <Rotate Degrees="45" Duration=".1" />
                    <Move X="50" Y="20" />
                </WhilePressed>
            </Rectangle>
            <Rectangle ux:Name="GreyRectangle" Width="100" Height="100" Fill="#ccc" CornerRadius="10" />
        </StackPanel>
    </DockPanel>
</App>
```
> 이런 식으로 다양한 효과를 줄 수 있다. 

## 3. 느낀점 
 다양한 효과를 주기 편하다. 각 태그들이 어떤 것들이 있는지 숙지하는 게 중요하겠다. 
`ex) <Rectangle Color="Blue" Width="100" Height="100" /> `

*좋은 사이트 *
[fuse 시작하기 - doc 설명
](https://github.com/Hazealign/fuse-docs-kr/blob/master/Fuse/01%20-%20%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0.md)

