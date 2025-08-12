import React, { useState, useEffect } from "react";
import { useAuth, useUser, useSession } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { useAPI } from "@/hooks/useAPI";
import { useInstagram } from "@/hooks/useInstagram";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

const AutomationSettingsCard = ({ onAutomationChange }) => {
  const auth = useAuth();
  const { user } = useUser();
  const { session } = useSession();
  const { get, put } = useAPI();
  const { instagramStatus, checkInstagramStatus } = useInstagram();

  // Get Instagram connection status
  const instagramConnected = instagramStatus.connected;

  const [settings, setSettings] = useState({
    keywords: [],
    dmTemplate: "",
    successMessage: "Thanks! Check your DMs! 📩",
    failureMessage: "Something went wrong! Please try again. 🔄",
    isEnabled: false,
    rateLimiting: {
      maxDMsPerHour: 10,
      maxDMsPerDay: 50,
      delayBetweenDMs: 30,
    },
    options: {
      matchType: "contains",
      caseSensitive: false,
    },
  });

  const [newKeyword, setNewKeyword] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch current automation settings
  useEffect(() => {
    const fetchSettings = async () => {
      if (!auth?.isSignedIn || !user || !session) return;

      try {
        setLoading(true);

        const data = await get("/user/profile");

        if (data.user?.automationSettings) {
          setSettings((prev) => ({
            ...prev,
            ...data.user.automationSettings,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch automation settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [auth?.isSignedIn, user?.id, session?.id]);

  // Check Instagram status when component mounts
  useEffect(() => {
    if (auth?.isSignedIn && user) {
      checkInstagramStatus();
    }
  }, [auth?.isSignedIn, user?.id, checkInstagramStatus]);

  const saveSettings = async () => {
    if (!instagramConnected) {
      toast.error("Please connect your Instagram account first");
      return;
    }

    if (!settings.keywords.length) {
      toast.error("Please add at least one keyword");
      return;
    }

    if (!settings.dmTemplate.trim()) {
      toast.error("Please enter a DM template");
      return;
    }

    setSaving(true);
    try {
      await put("/user/automation-settings", {
        keywords: settings.keywords,
        dmTemplate: settings.dmTemplate,
        successMessage: settings.successMessage,
        failureMessage: settings.failureMessage,
        isEnabled: settings.isEnabled,
        rateLimiting: settings.rateLimiting,
        options: settings.options,
      });

      toast.success("✅ Automation settings saved successfully!");
    } catch (error) {
      console.error("Failed to save automation settings:", error);
      toast.error(`❌ Failed to save settings: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const toggleAutomation = async () => {
    if (!instagramConnected) {
      toast.error("Please connect your Instagram account first");
      return;
    }

    if (!settings.keywords.length || !settings.dmTemplate.trim()) {
      toast.error("Please complete automation setup first");
      return;
    }

    try {
      const newEnabledState = !settings.isEnabled;

      await put("/user/automation-settings", {
        isEnabled: newEnabledState,
        keywords: settings.keywords,
        dmTemplate: settings.dmTemplate,
        successMessage: settings.successMessage,
        failureMessage: settings.failureMessage,
        rateLimiting: settings.rateLimiting,
        options: settings.options,
      });

      setSettings((prev) => ({ ...prev, isEnabled: newEnabledState }));
      toast.success(
        `✅ Automation ${
          newEnabledState ? "enabled" : "disabled"
        } successfully!`
      );

      if (onAutomationChange) {
        onAutomationChange(newEnabledState);
      }
    } catch (error) {
      console.error("Failed to toggle automation:", error);
      toast.error(
        `❌ Failed to ${
          settings.isEnabled ? "disable" : "enable"
        } automation: ${error.message}`
      );
    }
  };

  const addKeyword = () => {
    const keyword = newKeyword.trim().toLowerCase();
    if (keyword && !settings.keywords.includes(keyword)) {
      setSettings((prev) => ({
        ...prev,
        keywords: [...prev.keywords, keyword],
      }));
      setNewKeyword("");
    }
  };

  const removeKeyword = (index) => {
    setSettings((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((_, i) => i !== index),
    }));
  };

  const getSetupProgress = () => {
    const steps = [
      { name: "Instagram Connected", completed: instagramConnected },
      { name: "Keywords Added", completed: settings.keywords.length > 0 },
      {
        name: "DM Template Created",
        completed: settings.dmTemplate.trim().length > 0,
      },
      { name: "Automation Enabled", completed: settings.isEnabled },
    ];

    const completedSteps = steps.filter((step) => step.completed).length;
    return { steps, progress: (completedSteps / steps.length) * 100 };
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            Loading Automation Settings...
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const { steps, progress } = getSetupProgress();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              Comment-to-DM Automation
            </CardTitle>
            <CardDescription>
              Automatically send DMs when users comment specific keywords on
              your posts
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={instagramConnected ? "default" : "secondary"}>
              {instagramConnected
                ? "📱 Instagram Connected"
                : "❌ Instagram Required"}
            </Badge>
            <Badge
              variant={settings.isEnabled ? "default" : "secondary"}
              className={settings.isEnabled ? "bg-green-500" : ""}
            >
              {settings.isEnabled ? "🟢 ON" : "🔴 OFF"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Setup Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">Setup Progress</h4>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <span
                  className={
                    step.completed ? "text-green-500" : "text-muted-foreground"
                  }
                >
                  {step.completed ? "✅" : "⏳"}
                </span>
                <span
                  className={
                    step.completed ? "text-green-700" : "text-muted-foreground"
                  }
                >
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {!instagramConnected && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-orange-800 text-sm">
              ⚠️ Please connect your Instagram Business account first to
              configure automation settings.
            </p>
          </div>
        )}

        <Separator />

        {/* Keywords Section */}
        <div className="space-y-4">
          <div>
            <Label className="text-base font-semibold">Trigger Keywords</Label>
            <p className="text-sm text-muted-foreground mt-1">
              When users comment these keywords, they'll automatically receive a
              DM
            </p>
          </div>

          <div className="flex gap-2">
            <Input
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              placeholder="Enter a keyword..."
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addKeyword();
                }
              }}
              disabled={!instagramConnected}
            />
            <Button
              onClick={addKeyword}
              disabled={!instagramConnected || !newKeyword.trim()}
            >
              Add
            </Button>
          </div>

          {settings.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {settings.keywords.map((keyword, index) => (
                <Badge key={index} variant="outline" className="gap-2">
                  {keyword}
                  <button
                    onClick={() => removeKeyword(index)}
                    className="ml-1 text-red-500 hover:text-red-700"
                    disabled={!instagramConnected}
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Keyword Options */}
          <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
            <Label className="text-sm font-medium">Matching Options</Label>
            <RadioGroup
              value={settings.options.matchType}
              onValueChange={(value) =>
                setSettings((prev) => ({
                  ...prev,
                  options: { ...prev.options, matchType: value },
                }))
              }
              disabled={!instagramConnected}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="contains" id="contains" />
                <Label htmlFor="contains" className="text-sm">
                  Contains keyword (flexible matching)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="exact" id="exact" />
                <Label htmlFor="exact" className="text-sm">
                  Exact keyword match
                </Label>
              </div>
            </RadioGroup>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="caseSensitive"
                checked={settings.options.caseSensitive}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({
                    ...prev,
                    options: { ...prev.options, caseSensitive: checked },
                  }))
                }
                disabled={!instagramConnected}
              />
              <Label htmlFor="caseSensitive" className="text-sm">
                Case sensitive matching
              </Label>
            </div>
          </div>
        </div>

        <Separator />

        {/* DM Template Section */}
        <div className="space-y-4">
          <div>
            <Label className="text-base font-semibold">
              DM Message Template
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              This message will be sent automatically to users who comment
              trigger keywords
            </p>
          </div>

          <div className="space-y-2">
            <Textarea
              value={settings.dmTemplate}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, dmTemplate: e.target.value }))
              }
              placeholder="Hi there! Thanks for your interest. Here's what you're looking for..."
              maxLength={1000}
              rows={4}
              disabled={!instagramConnected}
            />
            <p className="text-xs text-muted-foreground text-right">
              {settings.dmTemplate.length}/1000 characters
            </p>
          </div>
        </div>

        <Separator />

        {/* Comment Reply Messages */}
        <div className="space-y-4">
          <div>
            <Label className="text-base font-semibold">
              Comment Reply Messages
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              These messages will be posted as replies to trigger comments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="successMessage" className="text-sm">
                Success Message (when DM sent successfully)
              </Label>
              <Input
                id="successMessage"
                value={settings.successMessage}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    successMessage: e.target.value,
                  }))
                }
                maxLength={200}
                disabled={!instagramConnected}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="failureMessage" className="text-sm">
                Failure Message (when DM fails)
              </Label>
              <Input
                id="failureMessage"
                value={settings.failureMessage}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    failureMessage: e.target.value,
                  }))
                }
                maxLength={200}
                disabled={!instagramConnected}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Rate Limiting Section */}
        <div className="space-y-4">
          <div>
            <Label className="text-base font-semibold">
              Rate Limiting (Safety Settings)
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Configure limits to prevent spam and comply with Instagram
              policies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxPerHour" className="text-sm">
                Max DMs per hour
              </Label>
              <Input
                id="maxPerHour"
                type="number"
                min="1"
                max="50"
                value={settings.rateLimiting.maxDMsPerHour}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    rateLimiting: {
                      ...prev.rateLimiting,
                      maxDMsPerHour: parseInt(e.target.value) || 1,
                    },
                  }))
                }
                disabled={!instagramConnected}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxPerDay" className="text-sm">
                Max DMs per day
              </Label>
              <Input
                id="maxPerDay"
                type="number"
                min="1"
                max="200"
                value={settings.rateLimiting.maxDMsPerDay}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    rateLimiting: {
                      ...prev.rateLimiting,
                      maxDMsPerDay: parseInt(e.target.value) || 1,
                    },
                  }))
                }
                disabled={!instagramConnected}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="delay" className="text-sm">
                Delay between DMs (seconds)
              </Label>
              <Input
                id="delay"
                type="number"
                min="10"
                max="300"
                value={settings.rateLimiting.delayBetweenDMs}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    rateLimiting: {
                      ...prev.rateLimiting,
                      delayBetweenDMs: parseInt(e.target.value) || 10,
                    },
                  }))
                }
                disabled={!instagramConnected}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={saveSettings}
            disabled={saving || !instagramConnected}
            className="flex-1"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <span className="mr-2">💾</span>
                Save Settings
              </>
            )}
          </Button>

          <Button
            onClick={toggleAutomation}
            disabled={
              !instagramConnected ||
              !settings.keywords.length ||
              !settings.dmTemplate.trim()
            }
            variant={settings.isEnabled ? "destructive" : "default"}
            className="flex-1"
          >
            {settings.isEnabled ? (
              <>
                <span className="mr-2">🔴</span>
                Disable Automation
              </>
            ) : (
              <>
                <span className="mr-2">🟢</span>
                Enable Automation
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomationSettingsCard;
