<?php

require 'vendor/autoload.php';
use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

function generateToken($username) {
                $secret_key = 'bGS6lzFqvvSQ8ALbOxatm7';
                $issuedat_claim = time();
                $notbefore_claim = $issuedat_claim + 10;
                $expire_claim = $issuedat_claim + 360;
                $token = array(
                    "iat" => $issuedat_claim,
                    "nbf" => $notbefore_claim,
                    "exp" => $expire_claim,
                    "data" => array(
                        "username" => $username
                    )
                );

                $jwt = JWT::encode($token, $secret_key, 'HS256');
                return array(
                        "message" => "Successful login",
                        "jwt" => $jwt,
                        "username" => $username,
                        "expireAt" => $expire_claim
                );
                
}