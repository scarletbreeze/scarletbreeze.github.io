---

title: rails nokogiri gem 활용하기
tag: web
---


6월 27일~28일 과제 nokogiri 사용하여 과제하기.

작업을 하면서, 마크다운을 함께 적었는데. 어제부터 이걸 계속 적게 될 줄은 몰랐습니다. 따로 이쁘게 하나 만들기 보다, 제가 그동안 노력해왔던 과정을 봐주시면 감사하겠습니다. 그리고 사실, 8번이 가장 중요합니다. 더 알고 싶은 것들 꼭 해결해보고 싶습니다. 열심히 했으니까, 이쁘게 봐주세요 ㅠ

- - -
참고자료: https://junee01.gitbooks.io/scraping-with-nokogiri-tutorial/content/chapter4.html

노코기리 파싱: http://ruby.bastardsbook.com/chapters/html-parsing/
- - -
#### 1. 왜 사용하는가 ?

Nokogiri 공식 Github에 가서 README 파일을 읽어보면 다음과 내용이 쓰여있다.

"Nokogiri parses and searches XML/HTML very quickly, and also has correctly implemented CSS3 selector support as well as Xpath 1.0 support." ("노코기리는 XML/HTML 파일을 빠른 속도로 검색 및 파싱할 수 있습니다. 또한 CSS 셀렉터와 Xpath 기능을 지원합니다.")+

즉, CSS로 이루어진 HTML 태그들을 잘 분석해서 원하는 내용으로 찾아갈 수 있도록 메소드들이 구성되어있고, 원하는 방식으로 재구성하여 추출 및 수정 활용을 가능하게 해주는 도구라고 생각하시면 된다.

#### 2. 페이지 분석하기.

 크롤링하고자 하는 페이지의 URL이 어떤 식으로 되어있는지를 알아야. 크롤링을 할 수 가 있다. 
 네이버 책의, 베스트셀러에 들어가보면, 페이지를 변경하여도 url이 변하지 않는 걸 알 수 있다. 하지만, 네이버 책, 철학 분야의 베스트 셀러에 들어가보면 url이 페이지마다 변하는 걸 확인할 수 있다. 따라서 철학 분야의 베스트 셀러를 크롤링 하기로 결정하였다.

첫 번째 페이지
```
http://book.naver.com/category/index.nhn?cate_code=120040

```
다섯번째 페이지
```
http://book.naver.com/category/index.nhn?cate_code=120040&tab=top100&list_type=list&sort_type=publishday&page=5
```
저기 보에는 page=1로 변경하면 첫 번째 페이지로 이동하게 된다. 즉 첫 번째 페이ㅣ에는 40뒤에 내용이 생략되어 있음을 추측해볼 수 있다.

그렇다면 어떤 내용을 추출할 것인가 ?

제목 / 저자/ 출판사 / 출판일/ 이미지 주소/ 링크 주소
이렇게 총 6가지를 추출할 것이다

제목은 다음과 같이 구성된다.

```
<dt id="book_title_0">
	<a class="N=a:bta.title" href=링크"> 제목이름</a>
</dt>	
```


이미지는 다음과 같이 구성된다.
```
<a href="링크주소" class="N=a:bta.thumb"> 
	<img src="http://bookthumb.phinf.naver.net/cover/015/332/01533226.jpg?type=m1&udate=20170627"> 
</a>

```

저자의 이름과 역자, 출판사, 출판년도는 다음과 같다.
```
<dd class="txt_block">

<a 링크 class="txt_name N=a:bta.author"> 지은이</a>

<a 링크 class="txt_name N=a:bta.translator">옮긴이</a>

<a 링크 class="N=a:bta.publisher">출판사</a>

출판년도는 클래스 없이 그냥 써있더라.
</dd>
```

출판년도는 클래스로 묶여있지 않고 그냥 써있었다. 이게 어떻게 가능한거지? 그래서 제목, 이미지, 저자, 출판사, 링크주소,옮긴이 이렇게 6개를 크롤링하기로 하였다.

따라서 모델 생성은 이렇게 하기로 하였다.

`
rails g model post title:String author:String translator:String publisher:String image:String  link:String 
`
#### 3. 작성하기

작성을 아무리 해도 안되더군요. post.rb제 코드는 다음과 같습니다.

```
 require 'nokogiri'
require 'open-uri'

class Post < ActiveRecord::Base
  validates :link, :uniqueness => true
  # 유니크 키 설정으로 중복처리를 검사한다고 선언한 것을 말한다. 
  # 즉 같은 대상을 여러번 크롤링 하는 명령을 내렸을 떄, 이미 같은 게 있으면 무시하라는 의미다.
  
  #url은 네이버책 철학분야이다.
  1.upto(5) do |p| 
    url = "http://book.naver.com/category/index.nhn?cate_code=120040&tab=top100&list_type=list&sort_type=publishday&page=#{p}"
    #노코기리 파서로 HTML 형태로 분류한 형태의 데이터를 data 변수에 저장한다.
    data = Nokogiri::HTML(open(url))
    #.css selector로 tbody 안의 tr 내용들만 가져온다.
    @posts = data.css('body > #wrap > #container > #content > #category_section > ol.bas')
    
    
  #각 tr을 for문으로 끝까지 반복하면서 작업을 진행한다.
  @posts.each do |post|  
      Post.create(
          #제목
          :title => post.css('ol > dd > a.N=a:bta.title').text.strip,
          #저자
          :author =>post.css('dl dd.txt_block a.N=a:bta.author').text.strip,
          #출판사
          :publisher =>post.css('dl dd.txt_block a.N=a:bta.publisher').text.strip,
          #옮긴이
          :translator =>post.css('div.thumb_type a.N=a:bta.thumb').text.strip,
          #이미지 주소
          :image => post.css('div.thumb_type thumb_type2 a img')[0]['src'].strip,
          #링크
          :link => post.css('div.thumb_type thumb_type2 a')[0]['href'].strip,
        )

    end
  end
end
```

####4. 과제는 끝내야 한다! 방향을 바꾸자
어제부터 오늘까지 정확히 10시간 동안 삽질을 했다.
그래서 컨트롤러로 방향을 바꾸기로 했다.

참고한 동영상 : https://www.youtube.com/watch?v=5tBF5cAd8Bg

이 동영상을 보니, 컨트롤러에서 작업을 했다. 이 동영상을 조금 응용해보니 네이버 책 제목을 크롤링 할 수 있었다.
그래서 문제는 nokogiri css 선택자였다는 생각이 팍 들었다. 그래서 그걸 조금더 보기로 했다. 

그랬더니 제목을 크롤링할 수 있었다.

```
require 'open-uri'
class HomeController < ApplicationController
  
  def index
    @titles = Array.new
    
    1.upto(5) do |c|
      doc = Nokogiri::HTML(open("http://book.naver.com/category/index.nhn?cate_code=120040&tab=top100&list_type=list&sort_type=publishday&page=#{c}"))
        0.upto(19) do |p|
          doc.css("dt#book_title_#{p}//a").each do |x|
            @titles << x.inner_text 
          end
      end
    end
  end
end

```

파싱이 문제다. 하나씩 개별적으로 저렇게 가져올 순 있다. 하지만 나는 하나의 컨텐츠로서, 1등의 책을 가져온 뒤에 거기서 그 책의 제목, 저자와 같은 내용들을 가져오고 싶다.
이 사이트의 도움을 받았다.

https://uni.likelion.org/questions/30

해쉬 형식으로 만들어서, 몇몇의 내용들을 가지고 올 수 있었으나, 출판사와 같은 경우, 클래스 명이 N=a:bta.publisher이와 같이 되어있었다. 그런데 .이 여러개가 들어가는 클래스 명은 클래스 문법과 충돌하게 되어 제대로 가져올 수가 없었다.
그래서 구글링을 통해서 
`[class='N=a:bta.publisher']` 이렇게 추가하면 되나는 것을 알 수 있었다. 

순위는 자바스크립트로 되어 있어서, 크롤링을 할 수가 없었다 따라서 번호를 써줘서 순서를 매겨주고 싶었으나,그렇게 하는데는 실패했다. 생각해보면, 
```
<% (1..10).each do |i| %>
<%= i %>
<% end %>
```

이런 식을 구현하면 간단할 것 같지만. 생각외로 쉽지가 않다. 반복문을 2번 쓰면 꼬이기 때문에, 해쉬 안에다가 넣어줘서 처리를 해주고 싶었으나, 제대로 실행되지 않았다. 어쩔 수 없이 순서를 매겨주는 건 포기할 수 밖에 없었다.

```
require 'nokogiri'
require 'open-uri'
class HomeController < ApplicationController
  def index
    @queries = Array.new
    
    1.upto(5) do |c|
      doc = Nokogiri::HTML(open("http://book.naver.com/category/index.nhn?cate_code=120040&tab=top100&list_type=list&sort_type=publishday&page=#{c}"))
      doc.css('ol.basic.top100 li').each do |item|
        bookKeyword = Hash.new
          
          bookKeyword['title']= item.css("dt//a").inner_text
          bookKeyword['link']=item.css("dt//a")[0]['href']
          bookKeyword['author']=item.css("dd.txt_block//a")[0].inner_text
          bookKeyword['publishor']=item.css("dd.txt_block//[class='N=a:bta.publisher']").inner_text
          
        @queries << bookKeyword
       
      end
    end
  end
end
```

#### 5.컨트롤러에 넣는 걸 성공했으니 이제 데이터베이스에 넣어보자!!

```
require 'nokogiri'
require 'open-uri'

class Post < ActiveRecord::Base
    1.upto(5) do |c|
      doc = Nokogiri::HTML(open("http://book.naver.com/category/index.nhn?cate_code=120040&tab=top100&list_type=list&sort_type=publishday&page=#{c}"))
        doc.css('ol.basic.top100 li').each do |item|
      
            Post.create(
                title: item.css("dt//a").inner_text,
                link: item.css("dt//a")[0]['href'],
                author: item.css("dd.txt_block//a")[0].inner_text,
                publisher: item.css("dd.txt_block//a[class='N=a:bta.publisher']").inner_text,
            )
        end
    end
end
```

이렇게 바꿔보니 성공하였다!!

#### 6.이제 검색 기능을 넣어보자!!

searchkick을 활용하고 싶었으나 아래와 같은 오류로 인해서 다른 방법을 찾아봐야 했다.
```
tarted GET "/posts/search?utf8=%E2%9C%93&search=%EC%9D%B8%EC%83%9D" for 122.44.167.236 at 2017-06-28 09:11:45 +0000
Cannot render console from 122.44.167.236! Allowed networks: 127.0.0.1, ::1, 127.0.0.0/127.255.255.255
Processing by PostsController#search as HTML
  Parameters: {"utf8"=>"✓", "search"=>"인생"}
  Rendered posts/search.html.erb within layouts/application (5.2ms)
Completed 500 Internal Server Error in 9ms (ActiveRecord: 0.0ms)

ActionView::Template::Error (undefined method `each' for Ransack::Search<class: Post, base: Grouping <combinator: and>>:Ransack::Search):
    1: <div class="row">
    2:   <%= @posts.each do |s| %>
    3:     <div class="col-sm-6 col-md-4">
    4:       <div class="thumbnails">
    5:         <%= s.title %>
  app/views/posts/search.html.erb:2:in `_app_views_posts_search_html_erb___97786302881104445_69818340865820'


  Rendered /usr/local/rvm/gems/ruby-2.3.0/gems/actionpack-4.2.5/lib/action_dispatch/middleware/templates/rescues/_source.erb (9.2ms)
  Rendered /usr/local/rvm/gems/ruby-2.3.0/gems/actionpack-4.2.5/lib/action_dispatch/middleware/templates/rescues/_trace.html.erb (4.1ms)
  Rendered /usr/local/rvm/gems/ruby-2.3.0/gems/actionpack-4.2.5/lib/action_dispatch/middleware/templates/rescues/_request_and_response.html.erb (1.5ms)
  Rendered /usr/local/rvm/gems/ruby-2.3.0/gems/actionpack-4.2.5/lib/action_dispatch/middleware/templates/rescues/template_error.html.erb within rescues/layout (37.6ms)
```

http://www.korenlc.com/creating-a-simple-search-in-rails-4/
이 사이트의 도움을 받았지만 되지 않았다. 

그래서 아래의 사이트에 희망을 걸어봤다.

https://www.youtube.com/watch?v=eUtUquKc2qQ

하 오늘 하루 종일 했는데도 안되었다. 그래서 마지막으로 새롭게 다시 만들어서 위 강의대로 해보기로 하였다.


7.이젠 더이상 시간이 없다...마지막이다. 처음부터 다시해보자
---



```
rails g scaffold Book title publisher author link
```

루트 값 book 설정해주면서 영상을 따라하니.
중복 검색이 안된다. 나는 pulisher와 title 그리고 author에 해당하는 것 모두를 검색하고 싶었지만, 중복 적용이 안되었다. 

그래도 제목 검색은 구현하였다. scaffold로 구현한거지만, 여기에 이제 넣어보자!

그렇게 해서 기초적인 페이지를 완성할 수 있었다.
기본적인 css를 추가해서 마무리 지으려고 한다 .

##8. 더 알아볼 것들
---

**1.td태그를 추가해서, 그 안에 순위를 가져오고 싶은데, 순위가 자바스크립트로 되어 있어서 못 가져왔습니다. 제가 생성한다면 어떤 방법이 있을까요 ?
**
**2.검색 기능을 추가할 때, **

```
def self.search(search)
        if search
            where(["title LIKE ?", "%#{search}%"])
        else
            all
        end
    end
```

여기서 where안에 있는 내용을 author, publisher로 바꾼 뒤, else로 연결해줘도 검색이 제대로 안되더라구요.. 어떻게 하면 author와 publisher도 함께 검색을 하게 할 수 있을까요 이런 것들을 더 알아보고 싶습니다.

**3.텍스트 에디터를 활용하여 이미지 주소를 가져왔을 때, 이미지가 업로드 되는 기능을 활용해서, 이미지도 크롤링해서 넣어보고 싶습니다!
**
**4.searchkick을 활용해서.. 검색을 제대로 구현해보고 싶습니다.
**
**5.ajax기능을 활용해서 검색을 했을 때, 검색 목록이 불러와지도록 구현해보고 싶습니다.**

**6.댓글을 작성한 뒤, 댓글이 ajax 로 불러와지는 것도 공부해보고 싶습니다.
**

