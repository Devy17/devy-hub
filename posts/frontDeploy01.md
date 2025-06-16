---
title: "React 프로젝트 AWS로 배포하기 - 01"
date: "2025-06-16"
summary: "AWS의 S3, CloudFront, Route53을 사용하여 React 프로젝트에 도메인 연결하기"
---

## 작성중입니다...

<!-- Section 1 -->
## AWS S3 정적 호스팅
### AWS S3 버킷 생성
### Github Actions를 이용하여 React 프로젝트 배포 자동화

<!-- Section 2 -->
## 도메인 구입
### Gabia(가비아)을 통한 도메인 구입
- **도메인 기간 설정** - ```1년```, ```2년```, ```3년```, ```5년```, ```10년```
- **네임서버 설정**  
    Route53 연결 이후 AWS에서 제공하는 네임서버로 등록해야 하므로,
    우선은 **가비아 네임서버 사용** 선택
- 약관 동의 및 결제 진행

### 추천 도메인 등록 기관
1) **Gabia (https://www.gabia.com/)**
 - **국내 서비스**이기 때문에 **한글 인터페이스 및 한국 고객센터** 이용 가능
 - 공공기관, 기업들이 많이 사용하는 만큼 **신뢰도 높고 안정적**임
 - 가격이 비싸고 Route53 연동이 약간 귀찮음  

2) **Namecheap (https://www.namecheap.com)**
- 첫 등록이 저렴하고 갱신 비용 또한 저렴한 편임
- Cloudflare, AWS, Github pages와 같은 서비스 연동 편함
- **한국어 지원이 없고**, 일부 국가 도메인(**.kr** 등) 사용 불가
3) 추후 추가 예정..

<!-- Section 3 -->
## AWS Route53 도메인 등록
### AWS Route53 설정
1. AWS 콘솔에서 **Route 53** 접속

2. 왼쪽 메뉴에서 **"Hosted zones"** 클릭

3. 우측 상단 ```Create hosted zone``` 을 클릭하여 정보 기입
    - **Domain name** : 구매한 도메인 (예: abcdefg.dev)   
    - **Type** : Public hosted zone

4. ```Create hosted zone``` 클릭
5. 4개의 **NS(네임서버)** 주소 정보 확인

### 도메인 등록 기관(가비아)에 네임서버 연결
1. 가비아 로그인 후 **My가비아 페이지**로 이동

2. **도메인 관리 페이지**로 이동

3. 좌측 메뉴에서 **도메인 정보 변경** 클릭

4. 구매한 도메인을 선택하고 ```네임서버``` 클릭

5. **AWS Route53에서 확인**한 **네임서버 주소** 기입

6. 소유자 인증 후 ```적용``` 버튼 클릭

### 네임서버 변경 확인 - https://dnschecker.org/
- **NS로 타입 변경** 후 Search 시도
- 변경에는 길면 **1 ~ 2시간**이 소요됨

<!-- Section 4 -->
## AWS CloudFront 배포
### CloudFront 배포 생성
1. AWS 콘솔에서 **CloudFront** 접속

2. ```Create a CloudFront distribution``` 을 클릭하여 정보 기입  
    - **Origin domain** : S3 버킷 선택
    - **Origin access**  
        Origin access control(OAC) 선택  
        **"Create OAC"** 를 클릭하여 OAC 생성
        > **Name**  
        > 이름 제한 없음 (편하게 작성)  
        >  
        > **Description**  
        > 설명란(선택 사항)  
        >  
        > **Signing behavior**  
        > Sign request (recommend) 선택  
        > Do not override authorization header 체크하지 않기  
   
    - **Viewer protocol policy** : ```Redirect HTTP to HTTPS```
    - Allowed HTTP methods : ```GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE```
    - Web Application Firewall (WAF) : ```Do not enable security protections```
    - Custom SSL certificate (HTTPS) : 일단은 ```None``` 선택
    - Alternate domain name (CNAME) : 일단은 입력하지 않음
  
3. ```Create distribution``` 클릭하여 CloudFront 배포 (약 10 ~ 15분 정도 소요)   
