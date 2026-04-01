import requests

def search_reddit(keyword, limit=10):
    # Reddit 검색 JSON URL
    url = f"https://www.reddit.com/search.json?q={keyword}&limit={limit}&sort=new"
    
    # User-Agent 설정 (본인의 정보를 적절히 섞어서 만드는 것이 좋습니다)
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }

    try:
        response = requests.get(url, headers=headers)
        
        # 응답 상태 확인
        if response.status_code == 200:
            data = response.json()
            posts = data['data']['children']
            
            print(f"--- '{keyword}' 검색 결과 (최신순 {len(posts)}개) ---\n")
            
            for i, post in enumerate(posts, 1):
                post_data = post['data']
                
                subreddit = post_data.get('subreddit_name_prefixed') # r/커뮤니티명
                title = post_data.get('title')                      # 제목
                permalink = post_data.get('permalink')              # 상세 주소
                full_url = f"https://www.reddit.com{permalink}"     # 전체 URL
                
                # 내용 요약 (본문이 있는 경우 앞부분 100자만 추출)
                selftext = post_data.get('selftext', '')
                summary = (selftext[:100] + '...') if len(selftext) > 100 else (selftext if selftext else "[내용 없음]")

                print(f"{i}. [{subreddit}] {title}")
                print(f"   - 요약: {summary}")
                print(f"   - URL: {full_url}")
                print("-" * 50)
                
        else:
            print(f"에러 발생: 상태 코드 {response.status_code}")
            if response.status_code == 429:
                print("너무 많은 요청을 보냈습니다. 잠시 후 다시 시도하세요.")

    except Exception as e:
        print(f"프로그램 실행 중 오류 발생: {e}")

# 실행 테스트
if __name__ == "__main__":
    # 사용자로부터 직접 키워드를 입력받음
    print("검색하고 싶은 키워드를 입력하세요: ", end="")
    search_keyword = input() 
    
    # 입력받은 키워드로 함수 호출
    search_reddit(search_keyword)
