import React, { useState, useEffect } from "react";
import { useAuth, useUser, useSession } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import {
  connectInstagramSimple,
  checkInstagramStatusSimple,
  disconnectInstagramSimple,
} from "@/utils/instagramSimple";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const InstagramAccountCard = ({ onStatusChange }) => {
  const auth = useAuth();
  const { user } = useUser();
  const { session } = useSession();

  const [instagramStatus, setInstagramStatus] = useState({
    connected: false,
    loading: true,
    account: null,
    permissions: [],
    connectedAt: null,
    tokenExpiresAt: null,
  });

  const [connecting, setConnecting] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);

  const fetchInstagramStatus = async () => {
    try {
      setInstagramStatus((prev) => ({ ...prev, loading: true }));

      const result = await checkInstagramStatusSimple(auth, user, session);

      if (result.connected && result.data) {
        setInstagramStatus({
          connected: true,
          loading: false,
          account: result.data.account || null,
          permissions: result.data.permissions || [],
          connectedAt: result.data.connectedAt || null,
          tokenExpiresAt: result.data.tokenExpiresAt || null,
        });
      } else {
        setInstagramStatus({
          connected: false,
          loading: false,
          account: null,
          permissions: [],
          connectedAt: null,
          tokenExpiresAt: null,
        });
      }

      // Notify parent component of status change
      if (onStatusChange) {
        onStatusChange(result.connected);
      }
    } catch (error) {
      console.error("Failed to fetch Instagram status:", error);
      setInstagramStatus((prev) => ({
        ...prev,
        loading: false,
        connected: false,
      }));
    }
  };

  useEffect(() => {
    if (auth?.isSignedIn && user && session) {
      fetchInstagramStatus();
    }
  }, [auth?.isSignedIn, user, session]);

  const handleConnectInstagram = async () => {
    try {
      setConnecting(true);
      await connectInstagramSimple(auth, user, session);
      // connectInstagramSimple handles the redirect, so this won't execute
    } catch (error) {
      console.error("Failed to connect Instagram:", error);
      toast.error(`❌ Connection failed: ${error.message}`);
      setConnecting(false);
    }
  };

  const handleDisconnectInstagram = async () => {
    if (
      !confirm(
        "Are you sure you want to disconnect your Instagram account? This will disable all automation."
      )
    ) {
      return;
    }

    try {
      setDisconnecting(true);
      await disconnectInstagramSimple(auth, user, session);

      setInstagramStatus({
        connected: false,
        loading: false,
        account: null,
        permissions: [],
        connectedAt: null,
        tokenExpiresAt: null,
      });

      toast.success("✅ Instagram account disconnected successfully");

      if (onStatusChange) {
        onStatusChange(false);
      }
    } catch (error) {
      console.error("Failed to disconnect Instagram:", error);
      toast.error(`❌ Failed to disconnect: ${error.message}`);
    } finally {
      setDisconnecting(false);
    }
  };

  const formatPermissionName = (permission) => {
    return permission
      .replace("instagram_business_", "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const isTokenExpiringSoon = () => {
    if (!instagramStatus.tokenExpiresAt) return false;
    const expiryDate = new Date(instagramStatus.tokenExpiresAt);
    const warningDate = new Date();
    warningDate.setDate(warningDate.getDate() + 7); // 7 days warning
    return expiryDate < warningDate;
  };

  if (instagramStatus.loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            Loading Instagram Status...
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">📱</span>
              Instagram Business Account
            </CardTitle>
            <CardDescription>
              {instagramStatus.connected
                ? "Your Instagram account is connected and ready for automation"
                : "Connect your Instagram Business account to enable comment-to-DM automation"}
            </CardDescription>
          </div>
          <Badge
            variant={instagramStatus.connected ? "default" : "secondary"}
            className={instagramStatus.connected ? "bg-green-500" : ""}
          >
            {instagramStatus.connected ? "✅ Connected" : "❌ Not Connected"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {!instagramStatus.connected ? (
          // Not Connected State
          <div className="text-center space-y-4">
            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <div className="text-4xl mb-2">🔗</div>
              <h3 className="font-semibold text-lg">
                Connect Your Instagram Business Account
              </h3>
              <p className="text-muted-foreground">
                Connect your Instagram Business account to enable automated
                comment responses and DM sending.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✅ Secure OAuth connection</p>
                <p>✅ No password required</p>
                <p>✅ Full control over permissions</p>
              </div>
            </div>

            <Button
              onClick={handleConnectInstagram}
              disabled={connecting || !auth?.isSignedIn}
              size="lg"
              className="w-full"
            >
              {connecting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <span className="mr-2">🔗</span>
                  Connect Instagram
                </>
              )}
            </Button>
          </div>
        ) : (
          // Connected State
          <div className="space-y-6">
            {/* Account Information */}
            {instagramStatus.account && (
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {instagramStatus.account.username
                      ? instagramStatus.account.username.charAt(0).toUpperCase()
                      : "IG"}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">
                        @{instagramStatus.account.username || "Unknown"}
                      </h3>
                      <Badge variant="outline">
                        {instagramStatus.account.accountType || "Business"}
                      </Badge>
                    </div>

                    {instagramStatus.connectedAt && (
                      <p className="text-sm text-muted-foreground">
                        Connected on{" "}
                        {new Date(
                          instagramStatus.connectedAt
                        ).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                {/* Account Stats */}
                {(instagramStatus.account.followersCount ||
                  instagramStatus.account.followingCount ||
                  instagramStatus.account.mediaCount) && (
                  <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Followers</p>
                      <p className="font-semibold">
                        {instagramStatus.account.followersCount?.toLocaleString() ||
                          "N/A"}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Following</p>
                      <p className="font-semibold">
                        {instagramStatus.account.followingCount?.toLocaleString() ||
                          "N/A"}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Posts</p>
                      <p className="font-semibold">
                        {instagramStatus.account.mediaCount?.toLocaleString() ||
                          "N/A"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <Separator />

            {/* Permissions */}
            {instagramStatus.permissions.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Granted Permissions
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {instagramStatus.permissions.map((permission) => (
                    <Badge
                      key={permission}
                      variant="outline"
                      className="justify-start"
                    >
                      ✅ {formatPermissionName(permission)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Token Information */}
            {instagramStatus.tokenExpiresAt && (
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Token Information
                </h4>
                <div
                  className={`p-3 rounded-lg ${
                    isTokenExpiringSoon()
                      ? "bg-orange-50 border border-orange-200"
                      : "bg-muted/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Token expires:</span>
                    <span
                      className={`text-sm font-medium ${
                        isTokenExpiringSoon() ? "text-orange-600" : ""
                      }`}
                    >
                      {new Date(
                        instagramStatus.tokenExpiresAt
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  {isTokenExpiringSoon() && (
                    <p className="text-xs text-orange-600 mt-2">
                      ⚠️ Token expires soon. You may need to reconnect your
                      account.
                    </p>
                  )}
                </div>
              </div>
            )}

            <Separator />

            {/* Disconnect Button */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={handleDisconnectInstagram}
                disabled={disconnecting}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                {disconnecting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                    Disconnecting...
                  </>
                ) : (
                  <>
                    <span className="mr-2">🔌</span>
                    Disconnect Instagram
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InstagramAccountCard;
