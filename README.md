# tagyou-meeting

# 주제

## 1:1 미팅이 부담스러운 사람들을 위한 다대다 미팅 지원

## Dto는 Data Transfer의 책임

- Controller는 명확히 전달만 해주는 역할의 관점에서 본다.
    - Controller는 그냥 전달만 해주는 것
    - 변환해서 보내주기.. 이런거 없이, 그냥 들어온거를 보내기만 한다.
        - Business layer의 분리를 잘 할 수 있다고 생각한다.

<aside>
💡 Service에서 받은거 처리, ResponseDto로 흘려보낸다.

</aside>
