from django.db import models
from django.urls import reverse


class Status(models.Model):
    id = models.PositiveSmallIntegerField(primary_key=True)
    name = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("id",)
        verbose_name_plural = "statuses"


class Presentation(models.Model):
    @classmethod
    def create(cls, **kwargs):
        kwargs["status"] = Status.objects.get(name="SUBMITTED")
        presentation = cls(**kwargs)
        presentation.save()
        return presentation

    presenter_name = models.CharField(max_length=150)
    company_name = models.CharField(max_length=150, null=True, blank=True)
    presenter_email = models.EmailField()

    title = models.CharField(max_length=200)
    synopsis = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    status = models.ForeignKey(
        Status,
        related_name="presentations",
        on_delete=models.PROTECT,
    )

    conference = models.ForeignKey(
        "events.Conference",
        related_name="presentations",
        on_delete=models.CASCADE,
    )

    def approve(self):
        status = Status.objects.get(name="APPROVED")
        self.status = status
        self.save()

    def reject(self):
        status = Status.objects.get(name="REJECTED")
        self.status = status
        self.save()

    def get_api_url(self):
        return reverse("api_show_presentation", kwargs={"pk": self.pk})

    def __str__(self):
        return self.title

    class Meta:
        ordering = ("title",)
