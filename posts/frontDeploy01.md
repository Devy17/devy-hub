---
title: "React 프로젝트 AWS로 배포하기"
date: "2025-06-16"
summary: "AWS의 S3, CloudFront, Route53을 사용하여 React 프로젝트에 도메인 연결하기"
---

<!-- Section 1 -->

## AWS S3 정적 호스팅

### AWS S3 버킷 생성

### Github Actions를 이용하여 React 프로젝트 배포 자동화

---

<!-- Section 2 -->

## 도메인 구입

### Gabia(가비아)을 통한 도메인 구입

- **도메인 기간 설정** - `1년`, `2년`, `3년`, `5년`, `10년`
- **네임서버 설정**  
   Route53 연결 이후 AWS에서 제공하는 네임서버로 등록해야 하므로,
  우선은 **가비아 네임서버 사용** 선택
- 약관 동의 및 결제 진행

### 추천 도메인 등록 기관

1. **Gabia (https://www.gabia.com/)**

- **국내 서비스**이기 때문에 **한글 인터페이스 및 한국 고객센터** 이용 가능
- 공공기관, 기업들이 많이 사용하는 만큼 **신뢰도 높고 안정적**임
- 가격이 비싸고 Route53 연동이 약간 귀찮음

2. **Namecheap (https://www.namecheap.com)**

- 첫 등록이 저렴하고 갱신 비용 또한 저렴한 편임
- Cloudflare, AWS, Github pages와 같은 서비스 연동 편함
- **한국어 지원이 없고**, 일부 국가 도메인(**.kr** 등) 사용 불가

3. 추후 추가 예정..

---

<!-- Section 3 -->

## AWS Route53 도메인 등록

### AWS Route53 설정

1. AWS 콘솔에서 **Route 53** 접속

2. 왼쪽 메뉴에서 **"Hosted zones"** 클릭

3. 우측 상단 `Create hosted zone` 을 클릭하여 정보 기입

   - **Domain name** : 구매한 도메인 (예: abcdefg.dev)
   - **Type** : Public hosted zone

4. `Create hosted zone` 클릭
5. 4개의 **NS(네임서버)** 주소 정보 확인

### 도메인 등록 기관(가비아)에 네임서버 연결

1. 가비아 로그인 후 **My가비아 페이지**로 이동

2. **도메인 관리 페이지**로 이동

3. 좌측 메뉴에서 **도메인 정보 변경** 클릭

4. 구매한 도메인을 선택하고 `네임서버` 클릭

5. **AWS Route53에서 확인**한 **네임서버 주소** 기입

6. 소유자 인증 후 `적용` 버튼 클릭

### 네임서버 변경 확인 - https://dnschecker.org/

- **NS로 타입 변경** 후 Search 시도
- 변경에는 길면 **1 ~ 2시간**이 소요됨

---

<!-- Section 4 -->

## AWS CloudFront 배포

### CloudFront 배포 생성

1. AWS 콘솔에서 **CloudFront** 접속

2. `Create a CloudFront distribution` 을 클릭하여 정보 기입

   - **Origin domain** : S3 버킷 선택
   - **Origin access**  
      `Origin access control(OAC)` 선택  
      `Create OAC` 를 클릭하여 `OAC` 생성

     > **Name**  
     > 이름 제한 없음 (편하게 작성)
     >
     > **Description**  
     > 설명란(선택 사항)
     >
     > **Signing behavior**  
     > `Sign request (recommend)` 선택  
     > `Do not override authorization header` 체크하지 않기

   - **Viewer protocol policy** : `Redirect HTTP to HTTPS`
   - **Allowed HTTP methods** : `GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE`
   - **Web Application Firewall (WAF)** : `Do not enable security protections`
   - **Custom SSL certificate (HTTPS)** : 일단은 `None` 선택
   - **Alternate domain name (CNAME)** : 일단은 입력하지 않음

3. `Create distribution` 클릭하여 **CloudFront** 배포 (약 10 ~ 15분 정도 소요)

---

<!-- Section 5 -->

## 인증서 발급

### ACM(AWS Certificate Manager) 인증서 발급

**❗❗ 반드시 Region을 us-east-1(N.Virginia)로 변경해주세요 ❗❗**

1. `Request a certificate` 클릭
2. `Request a public certificate` 선택
3. 인증서 발급 절차 진행
   > **Domain names**  
   > www._도메인명_._TLD_, _도메인명_._TLD_ 모두 입력 권장  
   > 예시) **abcdef.com, www.abcdef.com** 모두 입력

### 도메인 소유권 인증 (DNS 레코드 생성)

1. 인증서 발급 화면에서 `Create records in Route 53` 클릭
2. 자동으로 연결된 것을 확인한 뒤 `Create records` 클릭
3. 대시보드에서 각 도메인의 상태가 **Issued**로 변경되면 인증서 발급 완료

---

<!-- Section 6 -->

## 프로젝트 배포

### CloudFront 배포 수정

1. **AWS CloudFront**에 접속하여 이전에 생성한 배포 선택
2. 상단 메뉴에서 `General` 클릭
3. **Settings** 의 `Edit` 클릭
4. `Alter domain name (CNAME)` 에 구매한 도메인 입력
5. `Custom SSL certificate` 에 이전에 생성한 인증서 선택
6. 우측 하단 `Save changes` 클릭

### Route 53 도메인 연결

1. **AWS Route 53**에 접속하여 좌측 메뉴의 `Hosted zones` 클릭
2. 이전에 등록한 도메인 클릭
3. Create record 클릭
   > **Record name**  
   > 비워두면 `apex 도메인` (xxxx.com)  
   > **www.** 로 시작하는 도메인을 원한다면 **www** 작성 (www.xxxx.com)
   >
   > **Record type**  
   > `A - Routes traffic to an IPv4 address and some AWS resources` 선택
   >
   > **Alias**  
   > 사용
   >
   > **Route Traffic to**  
   > `Alias to CloudFront distribution` 선택  
   > 생성한 **CloudFront 배포** 선택
   >
   > **Routing policy**  
   > Simple routing 선택
4. `Create record` 클릭 후 연결 확인 (5 ~ 15분 소요)

### 403/404 Redirect 설정

1. **AWS CloudFront**에 접속하여 이전에 생성한 배포 선택
2. 상단 메뉴에서 `Error pages` 클릭
3. `Create custom error pages` 클릭

   > ### 403 설정
   >
   > **HTTP error code** : `403`  
   > **Customize error response** : `Yes`  
   > **Response page path** : `/index.html`  
   > **HTTP response code** : `200`

   > ### 404 설정
   >
   > **HTTP error code** : `404`  
   > **Customize error response** : `Yes`  
   > **Response page path** : `/index.html`  
   > **HTTP response code** : `200`
