import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';
import {UserStory} from "../entities/user-story.entitie";

@Injectable({providedIn:"root"})
export class UserStoryService {
   baseUrl = "http://localhost:3000";
  corsHeaders:HttpHeaders;
    constructor(private http:HttpClient){
      this.corsHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        "Access-Control-Request-Method": "*",
        "Access-Control-Request-Headers": "*"
      });

    }
    getAllUsersStories():Observable<UserStory[]>{
        //let baseUrl =(Math.random()> 0.0)?environment.baseUrl:environment.unreachableHost;
        //let baseUrl = environment.baseUrl;
        return this.http.get<UserStory[]>(this.baseUrl+"/user_stories?completed=false");
    }

    getActivatedUserStories():Observable<UserStory[]>{
        //let baseUrl = environment.baseUrl;
        return this.http.get<UserStory[]>(this.baseUrl+"/user_stories?activate=true&completed=false");
    }

    getCompletedUserStories():Observable<UserStory[]>{
        //let baseUrl = environment.baseUrl;
        return this.http.get<UserStory[]>(this.baseUrl+"/user_stories?completed=true");
    }

    searchUserStory(keyWord:string):Observable<UserStory[]>{
      //let baseUrl = environment.baseUrl;
      return this.http.get<UserStory[]>(this.baseUrl+"/user_stories?details_like="+keyWord);
    }

    activateUserStory(userstory:UserStory):Observable<UserStory>{
      //let baseUrl = environment.baseUrl;
      userstory.activate=!userstory.activate;
      return this.http.put<UserStory>(this.baseUrl+"/user_stories/"+userstory.id, userstory);
    }

    completeUserStroy(userstory:UserStory):Observable<UserStory>{
      //let baseUrl = environment.baseUrl;
      userstory.completed=!userstory.completed;
      userstory.activate=!userstory.activate;
      //userstory.details = "Task done";
      return this.http.put<UserStory>(this.baseUrl+"/user_stories/"+userstory.id, userstory);
    }

    deleteUserStory(userStory:UserStory):Observable<void>{
      //let baseUrl = environment.baseUrl;
      return this.http.delete<void>(this.baseUrl+"/user_stories/"+userStory.id);
    }

  deleteAllCompleteUserStory(userStory:UserStory):Observable<void>{
    //let baseUrl = environment.baseUrl;
    return this.http.delete<void>(this.baseUrl+"/user_stories/"+userStory.id);
  }

    saveUserStroy(userStrory:UserStory):Observable<UserStory>{
      //let baseUrl = environment.baseUrl;
      userStrory.activate=true;
      userStrory.completed= false;
      return this.http.post<UserStory>(this.baseUrl+"/user_stories",userStrory);
    }

    updateUserStory(userStrory:UserStory):Observable<UserStory>{
      //let baseUrl = environment.baseUrl;
      return this.http.put<UserStory>(this.baseUrl+"/user_stories/"+userStrory.id, userStrory);
    }
}
